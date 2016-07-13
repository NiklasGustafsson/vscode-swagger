'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
function activate(context) {
    var previewUri = vscode.Uri.parse('swagger-preview://authority/swagger-preview');
    var TextDocumentContentProvider = (function () {
        function TextDocumentContentProvider() {
            this._onDidChange = new vscode.EventEmitter();
            this._doc = null;
        }
        TextDocumentContentProvider.prototype.provideTextDocumentContent = function (uri) { return this.createCssSnippet(); };
        Object.defineProperty(TextDocumentContentProvider.prototype, "onDidChange", {
            get: function () { return this._onDidChange.event; },
            enumerable: true,
            configurable: true
        });
        TextDocumentContentProvider.prototype.update = function (uri) { this._onDidChange.fire(uri); };
        TextDocumentContentProvider.prototype.createCssSnippet = function () {
            var editor = vscode.window.activeTextEditor;
            if (!(editor.document.languageId === 'json')) {
                return "<body>Active editor doesn't show a JSON document - no properties to preview.</body>";
            }
            var doc = JSON.parse(editor.document.getText());
            this._doc = doc;
            return this.snippet(doc);
        };
        //
        // Formats HTML for a Swagger document.
        //
        TextDocumentContentProvider.prototype.snippet = function (doc) {
            // To simplify things, the style sheet is defined inside the HTML document.           
            var style = "<style>\nhtml {\n  font-family: \"Segoe WPC\", \"Segoe UI\", \"SFUIText-Light\", \"HelveticaNeue-Light\", sans-serif, \"Droid Sans Fallback\";\n  font-size: 10px; }\nbody {\n  font-family: \"Segoe WPC\", \"Segoe UI\", \"SFUIText-Light\", \"HelveticaNeue-Light\", sans-serif, \"Droid Sans Fallback\";\n  margin: 10px;\n  min-width: 300px; }\ndiv, span, p, ul, ol, dl {\n  font-size: 1.3rem; }\nh1, h2, h3, h4, h5, h6 {\n  font-weight: initial; }\nul {\n  padding-left: 2rem;\n  padding-right: 2rem; }\nh1 {\n  font-size: 2.4rem;\n  font-family: \"Segoe UI Semilight\", \"Segoe UI\", \"SFUIText-Light\", \"HelveticaNeue-Light\", \"Helvetica Neue\", sans-serif, \"Droid Sans Fallback\";\n  font-weight: 400;\n  margin-top: 2rem;\n  margin-bottom: .5rem; }\nh2 {\n  font-size: 1.6rem;\n  font-family: Menlo, Monaco, Consolas, \"Droid Sans Mono\", \"Courier New\", monospace, \"Droid Sans Fallback\";\n  color: #0072c6;\n  font-weight: 300; }\nh3, h4 {\n  font-size: 1.6rem;\n  color: #692682; }\nh4 {\n  margin-bottom: 0; }\nul {\n  list-style: none; }\n.get-put .parameters,\n.get-put .responses {\n  padding-left: 0; }\n.info {\n  margin-top: .5rem; }\n.key {\n  color: #767676;\n  padding-right: .75rem;\n  font-family: \"Segoe UI Semibold\", \"Segoe UI\", \"SFUIText-Light\", \"HelveticaNeue-Light\", sans-serif, \"Droid Sans Fallback\"; }\n.termlabel {\n  font-size: 1.6rem;\n  font-family: \"Segoe UI Semibold\", \"Segoe UI\", \"SFUIText-Light\", \"HelveticaNeue-Light\", sans-serif, \"Droid Sans Fallback\";\n  color: #333333; }\n.optional-required {\n  font-family: \"Segoe UI Semibold\", \"Segoe UI\", \"SFUIText-Light\", \"HelveticaNeue-Light\", sans-serif, \"Droid Sans Fallback\";\n  color: #333333;\n  font-weight: 400; }\n.type {\n  display: block; }\ndl {\n  position: relative;\n  width: 100%;\n  margin: 0; }\ndt, dd {\n  padding: .5rem 0 .5rem 0; }\ndt {\n  position: absolute;\n  width: 25%; }\ndd {\n  position: relative;\n  margin: 0; }\n  dd > span, dd > div {\n    margin-left: 25%; }\nheader h1 {\n  color: #692682;\n  font-size: 3.7rem;\n  font-family: \"Segoe UI Light\", \"Segoe UI\", \"SFUIText-Light\", \"HelveticaNeue-Light\", \"Helvetica Neue\", sans-serif, \"Droid Sans Fallback\";\n  font-weight: 300; }\n  header h1:first-child {\n    margin-top: 0; }\nheader h2 {\n  color: #767676;\n  font-size: 1.87rem;\n  font-family: \"Segoe UI Semilight\", \"Segoe UI\", \"SFUIText-Light\", \"HelveticaNeue-Light\", \"Helvetica Neue\", sans-serif, \"Droid Sans Fallback\";\n  font-weight: 400;\n  margin-top: 0; }\nheader ul {\n  padding-left: 6px;\n  border: 1px solid #dbdbdb;\n  border-left: 6px solid #dbdbdb; }\n.collapsed .content {\n  display: none; }\nmain .get-put .description:not(:first-of-type) dd::after {\n  content: \"\";\n  display: block;\n  border-top: 1px solid #dbdbdb;\n  margin-top: 1.5rem; }\nmain .get-put h3 {\n  font-size: 1.87rem;\n  color: #6c6c6c;\n  text-transform: uppercase;\n  font-family: \"Segoe WPC\", \"Segoe UI\", \"SFUIText-Light\", \"HelveticaNeue-Light\", sans-serif, \"Droid Sans Fallback\";\n  font-weight: bold; }\nmain .arrow {\n  cursor: pointer;\n  display: block;\n  position: relative; }\n  main .arrow > h2, main .arrow > h3 {\n    cursor: pointer; }\n  main .arrow::before {\n    -ms-high-contrast-adjust: none;\n    position: absolute;\n    display: block;\n    content: \"\";\n    width: 0;\n    height: 0;\n    top: 7px;\n    border-style: solid;\n    border-color: transparent #646465 transparent transparent;\n    border-width: 8.4px 8.4px 0 7px;\n    left: -21px; }\n    @media screen and (-ms-high-contrast: active) {\n      main .arrow::before {\n        border-color: transparent #fff transparent transparent; } }\nmain li.collapsed > .arrow::before {\n  border-width: 5.6px 5.6px 5.6px 7px;\n  left: -15px;\n  border-color: transparent transparent transparent #A6A6A6;\n  border-left-color: #D4D4D4; }\n  @media screen and (-ms-high-contrast: active) {\n    main li.collapsed > .arrow::before {\n      border-color: transparent transparent transparent #fff;\n      border-left-color: #fff; } }\nmain li.collapsed > .arrow::after {\n  -ms-high-contrast-adjust: none;\n  position: absolute;\n  display: block;\n  content: \"\";\n  width: 0;\n  height: 0;\n  border-style: solid;\n  border-color: transparent;\n  border-left-color: #f6f6f6;\n  border-width: 2px;\n  border-left-width: 2px;\n  top: 10px;\n  left: 0%;\n  margin-left: -13px; }\n\t\t\t\t</style>";
            // Overall formatting logic -- include basic API information in the header.
            var intro = '<body><header>' + this.heading(doc) +
                '<div class="summary"><p>' + this.getDescription(doc.info) + '</p>' +
                '<ul><table>' +
                '<tr><td class="key">Host:</td><td class="value">' + this.getHost(doc) + '</td></tr>' +
                '<tr><td class="key">Schemes:</td><td class="value">' + this.getSchemes(doc) + '</td></tr>' +
                '<tr><td class="key">License:</td><td class="value">' + this.getLicense(doc) + '</td></tr>' +
                this.getConsumes(doc) + this.getProduces(doc) +
                '</table></ul></div></header>';
            // Then process the main sections: paths, definitions, parameters, and responses.
            // TODO: Support the security-related sections, too.
            var paths = this.getPaths();
            var definitions = doc.hasOwnProperty('definitions') ? this.getDefinitions(doc.definitions) : '';
            var parameters = doc.hasOwnProperty('parameters') ? this.getClientParameters(doc.parameters) : '';
            var responses = doc.hasOwnProperty('responses') ? this.getGlobalResponses(doc.responses) : '';
            return style + intro + '<main><ul>' +
                paths + definitions + parameters + responses +
                '</ul></main>' + "\n\t\t<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/2.2.3/jquery.min.js\"></script>\n\t\t<script>\n\t\t\t$(document).ready(function(){\n\t\t\t\tvar arrow = $('.arrow');\n\t\t\t\tarrow.click(function(){\n\t\t\t\t\tconsole.log('test');\n\t\t\t\t\tvar parent = $(this).parent();\n\t\t\t\t\tif (parent.hasClass('collapsed')) {\n\t\t\t\t\t\tparent.removeClass('collapsed');\n\t\t\t\t\t}\n\t\t\t\t\telse {\n\t\t\t\t\t\tparent.addClass('collapsed');\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t});\n\t\t</script></body>";
        };
        //
        // Formaths the HTML for the heading, which includes the title and version label.
        //
        TextDocumentContentProvider.prototype.heading = function (doc) {
            var title = ((doc.info != null && doc.info.title != undefined) ? doc.info.title : '<div">No Document Title</div>');
            var version = ((doc.info != null && doc.info.version != undefined) ? doc.info.version : '<div">No Document Version</div>');
            return '<h1>' + title + '</h1><h2>Version ' + version + '</h2>';
        };
        //
        // Retrieves the host information.
        //
        TextDocumentContentProvider.prototype.getHost = function (doc) {
            if (doc.hasOwnProperty('host')) {
                return doc.host;
            }
            else {
                return 'no host specified';
            }
        };
        //
        // Formats HTML for an 'info.license' element.
        //
        TextDocumentContentProvider.prototype.getLicense = function (doc) {
            if (doc.hasOwnProperty('info') && doc.info.hasOwnProperty('license')) {
                var result = doc.info.license.name;
                if (doc.info.license)
                    result += ' (<a href="' + doc.info.license.url + '">' + doc.info.license.url + '</a>)';
                return result;
            }
            else {
                return 'no license specified';
            }
        };
        //
        // Formats HTML for a 'produces' element.
        //
        TextDocumentContentProvider.prototype.getProduces = function (doc) {
            var result = '';
            if (doc.hasOwnProperty('produces') && doc.produces.length > 0) {
                result += '<tr><td class="key">Produces:</td><td class="value">';
                for (var c in doc.produces) {
                    result += doc.produces[c] + '&nbsp;';
                }
                result += '</td></tr>';
            }
            return result;
        };
        //
        // Formats HTML for a 'consumes' element.
        //
        TextDocumentContentProvider.prototype.getConsumes = function (doc) {
            var result = '';
            if (doc.hasOwnProperty('consumes') && doc.consumes.length > 0) {
                result += '<tr><td class="key">Consumes:</td><td class="value">';
                for (var c in doc.consumes) {
                    result += doc.consumes[c] + '&nbsp;';
                }
                result += '</td></li>';
            }
            return result;
        };
        //
        // Retrieves the declared protocols supported by the API.
        //
        TextDocumentContentProvider.prototype.getSchemes = function (doc) {
            var result = '';
            if (doc.hasOwnProperty('schemes')) {
                for (var key in doc.schemes) {
                    result += doc.schemes[key] + '&nbsp;';
                }
            }
            else {
                result = 'no schemes specified';
            }
            return result;
        };
        //
        // Formats HTML for all the path elements under the 'paths' and 'x-ms-paths' sections of the Swagger doc.
        //
        TextDocumentContentProvider.prototype.getPaths = function () {
            var result = '<li><h1 class="arrow">Service Paths</h1><ul id="service_paths">';
            // Merge the standard Swagger 'paths' and the Microsoft-specific 'x-ms-paths' sections
            var paths = {};
            if (this._doc.hasOwnProperty('paths')) {
                for (var key in this._doc.paths) {
                    paths[key] = this._doc.paths[key];
                }
            }
            if (this._doc.hasOwnProperty('x-ms-paths')) {
                for (var key in this._doc['x-ms-paths']) {
                    if (paths[key]) {
                        for (var k in this._doc['x-ms-paths'][key]) {
                            paths[key][k] = this._doc['x-ms-paths'][key][k];
                        }
                    }
                    else {
                        paths[key] = this._doc['x-ms-paths'][key];
                    }
                }
            }
            for (var key in paths) {
                var element = paths[key];
                result += '<li><h2 class="arrow">' + key + '</h2>';
                result += '<div class="content">';
                if (element.hasOwnProperty('parameters') && element.parameters.length > 0) {
                    result += '<h3 class="parameters-all">Parameters for All Operations</h3>';
                    result += this.getOperationParameters('Parameters for All Methods', element);
                }
                result += this.getOperations(element);
                result += '</div></li>';
            }
            return result + '</ul></li>';
        };
        //
        // Formats HTML for the operations of a path element.
        //
        TextDocumentContentProvider.prototype.getOperations = function (path) {
            var result = '<ul class="get-put">';
            for (var key in path) {
                var element = path[key];
                switch (key) {
                    case 'get':
                    case 'put':
                    case 'post':
                    case 'delete':
                    case 'head':
                    case 'patch':
                        result += '<li><h3 class="arrow">' + key.toUpperCase() + '</h3>';
                        break;
                    case 'parameters':
                        // Matches the path-level parameters section. HTML has already been
                        // formatted for it, so we just ignore it here.
                        continue;
                    default:
                        // Swagger only supports a standard set of HTTP verbs, so warn about those that are outside that set.
                        result += '<h3 class="arrow" style="color:red">Unsupported HTTP verb: ' + key.toUpperCase() + '</h3>';
                        break;
                }
                result += '<div class="content">';
                if (element.hasOwnProperty('description')) {
                    result += '<div class="definition">' + this.getDescription(element) + '</div>';
                }
                result += '<ul><li>';
                if (element.hasOwnProperty('operationId')) {
                    var ids = element.operationId.split('_');
                    result += '<table>';
                    if (ids.length == 1) {
                        result += '<tr><td>Operation Id</td><td>' + element.operationId + '</td></tr>';
                    }
                    else if (ids.length == 2) {
                        result += '<tr><td class="key">Group:</td><td class="value">' + ids[0] + '</td></tr>';
                        result += '<tr><td class="key">Operation:</td><td class="value">' + ids[1] + '</td></tr>';
                    }
                    result += this.getConsumes(element);
                    result += this.getProduces(element);
                    result += '</table>';
                }
                result += '</li></ul>';
                if (element.hasOwnProperty('parameters') && element.parameters.length > 0) {
                    result += '<h4>Parameters</h4>';
                    result += this.getOperationParameters('Parameters', element);
                }
                if (element.hasOwnProperty('responses')) {
                    result += this.getOperationResponses(element.responses);
                }
                result += '</div></li>';
            }
            return result + '</ul>';
        };
        //
        // Formats HTML for the parameter definitions under a specific operation.
        //
        TextDocumentContentProvider.prototype.getOperationParameters = function (caption, operation) {
            var result = '';
            if (operation.hasOwnProperty('parameters')) {
                result += '<ul class="parameters"><li>';
                result += '<table width="100%" class="description">';
                for (var key in operation.parameters) {
                    var parameter = operation.parameters[key];
                    result += this.getParameter(parameter);
                }
                result += '</table>';
                result += '</li></ul>';
            }
            return result;
        };
        //
        // Formats HTML for the definitions in the top-level 'parameters' section.
        //
        TextDocumentContentProvider.prototype.getClientParameters = function (parameters) {
            var result = '<li><h1 class="arrow">Client (Global) Parameters</h1><ul>';
            result += '<div class="content">';
            for (var key in parameters) {
                var parameter = parameters[key];
                result += '<li id="schema' + key + '"><h2  class="arrow" style="font-size: 1.87rem">' + key + '</h2>';
                result += '<div class="content">';
                result += '<table width="100%" class="description">';
                result += this.getParameter(parameter);
                result += '</table></div></li>';
            }
            return result + '</div></ul></li>';
        };
        //
        // Formats HTML containing information about a parameter.
        //
        TextDocumentContentProvider.prototype.getParameter = function (parameter) {
            var result = '';
            parameter = this.resolveReference(parameter);
            if (parameter == null)
                return '';
            if (parameter.hasOwnProperty('name')) {
                var isObject = parameter.hasOwnProperty('schema') && this.isObject(parameter.schema);
                var isArray = parameter.hasOwnProperty('items');
                var type = this.getType(isObject ? parameter.schema : parameter);
                var required = (parameter.hasOwnProperty('required') && parameter.required);
                result += '<tr><td width="1%"/>';
                // The formatted HTML is quite different for object types (and arrays of object types) and all others.
                if (isObject) {
                    result += '<td width="25%" style="padding: 1.0rem 0 1.0rem 0" valign="top">' + this.getName('No Name', parameter) + '</td>';
                    result += '<td width="*" style="padding: 1.0rem 0 1.0rem 0"><span class="description" valign="top">' + this.getDescription(parameter) + '</span>' +
                        '<div class="info"><span class="value">This parameter is ' + (required ? 'required' : 'optional') + ' and passed in ' + this.getParameterLocation(parameter) + '</span>';
                    result += '</div></td>';
                    result += '<tr><td width="1%"/><td width="*" colspan="2"><span class="type">' + type + '</span></td>';
                }
                else {
                    result += '<td width="25%" style="padding: 1.0rem 0 1.0rem 0" valign="top">' + this.getName('No Name', parameter) + '<span class="type">' + type + '</span></td>';
                    result += '<td width="*" style="padding: 1.0rem 0 1.0rem 0"><span class="description" valign="top">' + this.getDescription(parameter) + '</span>' +
                        '<div class="info"><span class="value">This parameter is ' + (required ? 'required' : 'optional') + ' and passed in ' + this.getParameterLocation(parameter) + '</span>';
                    var element = isArray ? parameter.items : parameter;
                    var dflt = this.getDefaultValue(element, isArray);
                    var valids = this.getValidValues(element, isArray);
                    var constraints = this.getConstraints(element, isArray);
                    var isConstant = required && element.hasOwnProperty('enum') && element.enum.length == 1;
                    if (isConstant)
                        result += '</div><div><span class="value">Since this parameter is required and has only one valid value, it is effectively a constant.</span>';
                    if (constraints != null) {
                        result += '</div><div>' + constraints;
                    }
                    if (valids != null) {
                        result += '</div><div>' + valids;
                    }
                    if (dflt != null && !isConstant) {
                        result += '</div><div>' + dflt;
                    }
                    result += '</div>';
                }
                result += '</td></tr>';
            }
            return result;
        };
        //
        // Formats a phrase indicating the location of a parameter (body, path, header, etc.)
        //  
        TextDocumentContentProvider.prototype.getParameterLocation = function (parameter) {
            if (parameter.hasOwnProperty('in')) {
                switch (parameter['in']) {
                    case 'header':
                        return 'a header';
                    case 'form':
                        return 'a form element';
                    default:
                        return 'the ' + parameter['in'];
                }
            }
            return 'unknown location';
        };
        //
        // Formats HTML for the responses defined in the top-level 'responses' section.
        //
        TextDocumentContentProvider.prototype.getGlobalResponses = function (responses) {
            var result = '<li><h1 class="arrow">Responses</h1>';
            result += '<div class="content"><ul class="responses">';
            for (var key in responses) {
                result += '<li id="schema' + key + '"><h2 style="font-size: 1.87rem">' + key + '</h2>';
                result += '<table width="100%" class="description">';
                var response = responses[key];
                result += this.getOperationResponse(key, response);
                result += '</table></li>';
            }
            return result + '</div></ul></li>';
        };
        //
        // Formats HTML for the responses defined under a specific operation.
        //
        TextDocumentContentProvider.prototype.getOperationResponses = function (responses) {
            var result = '<h4>Responses</h4>';
            result += '<ul class="responses">';
            for (var key in responses) {
                result += '<li><table width="100%" class="description">';
                var response = responses[key];
                result += this.getOperationResponse(key, response);
                result += '</table></li>';
            }
            result += '</ul>';
            return result;
        };
        //
        // Formats HTML for a response found under the top-level 'responses' section.
        //
        TextDocumentContentProvider.prototype.getGlobalResponse = function (key, response) {
            var result = '';
            var isObject = response.hasOwnProperty('schema') && this.isObject(response.schema);
            var type = this.getType(response.hasOwnProperty('schema') ? response.schema : response);
            var headers = this.getHeaders(response, isObject);
            result += '<tr><td width="1%"/>';
            if (isObject) {
                result += '<td width="25%" style="padding: 1.0rem 0 1.0rem 0" valign="top" colspan="2"><span class="description">' + this.getDescription(response) + '</span></td>';
                result += '<tr><td width="1%"/><td width="*" colspan="2"><span class="type">' + type + '</span></td>';
                if (headers) {
                    result += '</td></tr><tr><td width="1%"/><td width="*" colspan="2">';
                    result += '<div class="info"><span class="termlabel" style="font-size: 1.50rem;color: #692682">Headers</span></div>';
                    result += '<div class="info"><span class="termlabel">' + headers + '</span></div>';
                }
            }
            else {
                result += '<td width="25%" style="padding: 1.0rem 0 1.0rem 0" valign="top"><span class="termlabel">' + key + '</span><span class="type">' + type + '</span></td>';
                result += '<td width="*" style="padding: 1.0rem 0 1.0rem 0" valign="top"><span class="description">' + this.getDescription(response) + '</span>';
                if (headers) {
                    result += '<div class="info"><span class="termlabel" style="font-size: 1.50rem;color: #692682">Headers</span></div>';
                    result += '<div class="info"><span class="termlabel">' + headers + '</span></div>';
                }
            }
            return result + '</td></tr>';
        };
        //
        // Formats HTML for a response found under an operation. The formatting is very similar to what the previous
        // method produces, but not exactly the same, so two methods is the easiest way to deal with it. 
        //
        TextDocumentContentProvider.prototype.getOperationResponse = function (key, response) {
            var result = '';
            var schema = response.schema;
            var isObject = response.hasOwnProperty('schema') && this.isObject(response.schema);
            var type = this.getType(response.hasOwnProperty('schema') ? response.schema : response);
            var headers = this.getHeaders(response, isObject);
            result += '<tr><td width="1%"/>';
            if (isObject) {
                result += '<td width="25%" style="padding: 1.0rem 0 1.0rem 0" valign="top"><span class="termlabel">' + key + '</span></td>';
                result += '<td width="*" style="padding: 1.0rem 0 1.0rem 0" valign="top"><span class="description">' + this.getDescription(response) + '</span></td></tr>';
                if (headers) {
                    result += '<tr><td width="1%"/><td width="*" colspan="2">';
                    result += '<div class="info"><span class="termlabel" style="font-size: 1.50rem;color: #692682">Headers</span></div>';
                    result += '<div class="info"><span class="termlabel">' + headers + '</span></div></td></tr>';
                }
                result += '<tr><td width="1%"/><td width="*" colspan="2"><span class="type">' + type + '</span>';
            }
            else {
                result += '<td width="25%" style="padding: 1.0rem 0 1.0rem 0" valign="top"><span class="termlabel">' + key + '</span><span class="type">' + type + '</span></td>';
                result += '<td width="*" style="padding: 1.0rem 0 1.0rem 0" valign="top"><span class="description">' + this.getDescription(response) + '</span>';
                if (headers) {
                    result += '<div class="info"><span class="termlabel" style="font-size: 1.50rem;color: #692682">Headers</span></div>';
                    result += '<div class="info"><span class="termlabel">' + headers + '</span></div>';
                }
            }
            return result + '</td></tr>';
        };
        //
        // Formats HTML for the 'definitions' section of the Swagger document
        //
        TextDocumentContentProvider.prototype.getDefinitions = function (definitions) {
            var result = '<li><h1 class="arrow" >Definitions</h1><ul>';
            for (var key in definitions) {
                var definition = definitions[key];
                result += '<li><h2 class="arrow" style="font-size: 1.87rem">' + key + '</h2>';
                result += '<div class="content">';
                result += '<p>' + this.getDescription(definition) + '</p>';
                result += '<ul class="get-put"><li>';
                result += this.getSchema(definition);
                result += '</li></ul></div>';
            }
            return result + '</ul></li>';
        };
        //
        // Formats HTML for a schema type.
        //
        TextDocumentContentProvider.prototype.getSchema = function (schema, nested) {
            if (nested === void 0) { nested = false; }
            schema = this.resolveReference(schema);
            if (schema == null)
                return '';
            if (!schema.hasOwnProperty('type') || schema.type == 'object' || schema.type == 'array') {
                return this.getObjectSchema(schema, nested);
            }
            var result = '<ul class="parameters"><li>';
            if (nested) {
                // There's currently a problem formatting nested schema information, since the column get very narrow. Therefore, omit
                // some of the descriptive information when nested.
                result += '<span class="description">Please see the "definitions" entry for the schema for full details.</span>';
            }
            else if (schema.hasOwnProperty('description')) {
                result += '<span class="description">' + this.getDescription(schema) + '</span>';
            }
            result += '<table class="description" width="100%">';
            result += '<tr><td width=".5%"/>';
            result += '<td width="25%" style="padding: 1.0rem 0 1.0rem 0" valign="top"><span class="type">' + schema.type + '</span></td>';
            if (nested) {
                result += '<td width="*" style="padding: 1.0rem 0 1.0rem 0" valign="top">';
            }
            else {
                result += '<td width="*" style="padding: 1.0rem 0 1.0rem 0" valign="top">';
                var isArray = schema.hasOwnProperty('items');
                var dflt = this.getDefaultValue(schema, isArray);
                var valids = this.getValidValues(schema, isArray);
                var constraints = this.getConstraints(schema, isArray);
                if (dflt != null)
                    result += '</div><div>' + dflt;
                if (constraints != null)
                    result += '</div><div>' + constraints;
                if (valids != null)
                    result += '</div><div>' + valids;
            }
            result += '</td></tr>';
            result += '</table>';
            result += '</li></ul>';
            return result;
        };
        TextDocumentContentProvider.prototype.getObjectSchema = function (schema, nested) {
            if (nested === void 0) { nested = false; }
            var result = '';
            var inherits = false;
            if (schema.hasOwnProperty('allOf')) {
                inherits = true;
                result += '<h4>Inherits</h4>';
                for (var b in schema.allOf) {
                    var base = this.resolveReference(schema.allOf[b]);
                    result += '<span class="description">' + this.getReferencedName(schema.allOf[b]) + '</span>';
                    if (nested) {
                        // There's currently a problem formatting nested schema information, since the column get very narrow. Therefore, omit
                        // some of the descriptive information when nested.
                        result += '<span class="description">Please see the "definitions" entry for the schema for full details.</span>';
                    }
                    else if (schema.hasOwnProperty('description')) {
                        result += '<span class="description">' + this.getDescription(base) + '</span>';
                    }
                }
                var inherited = schema.allOf;
                if (!schema.hasOwnProperty('properties')) {
                    schema.properties = {};
                }
                result += '<h4>Inherited Properties</h4>';
                result += '<ul class="parameters"><li>';
                result += '<table class="description" width="100%">';
                for (var b in schema.allOf) {
                    var base = this.resolveReference(schema.allOf[b]);
                    if (base.hasOwnProperty('properties')) {
                        for (var p in base.properties) {
                            if (schema.properties[p] != null)
                                continue;
                            var property = base.properties[p];
                            var required = base.hasOwnProperty('required') && (base.required.indexOf(p) > -1) ||
                                schema.hasOwnProperty('required') && (schema.required.indexOf(p) > -1);
                            result += this.getPropertyInfo(p, property, required, nested);
                        }
                    }
                }
                result += '</table>';
                result += '</li></ul>';
            }
            if (schema.hasOwnProperty('properties') && Object.keys(schema.properties).length > 0) {
                result += '<h4>Properties</h4>';
                result += '<ul class="parameters"><li>';
                if (nested) {
                    // There's currently a problem formatting nested schema information, since the column get very narrow. Therefore, omit
                    // some of the descriptive information when nested.
                    result += '<span class="description">Please see the "definitions" entry for the schema for full details.</span>';
                }
                else if (schema.hasOwnProperty('description')) {
                    result += '<span class="description">' + this.getDescription(schema) + '</span>';
                }
                result += '<table class="description" width="100%">';
                for (var p in schema.properties) {
                    var property = schema.properties[p];
                    var required = schema.hasOwnProperty('required') && (schema.required.indexOf(p) > -1);
                    result += this.getPropertyInfo(p, property, required, nested);
                }
                result += '</table>';
                result += '</li></ul>';
            }
            return result;
        };
        TextDocumentContentProvider.prototype.getPropertyInfo = function (p, property, required, nested) {
            var result = '<tr><td width=".5%"/>';
            result += '<td width="25%" style="padding: 1.0rem 0 1.0rem 0" valign="top">' + this.getName(p, property) + '<span class="type">' + this.getType(property, false, null, true) + '</span></td>';
            if (nested) {
                result += '<td width="*" style="padding: 1.0rem 0 1.0rem 0" valign="top">';
            }
            else {
                result += '<td width="*" style="padding: 1.0rem 0 1.0rem 0" valign="top"><span class="description">' + this.getDescription(property) + '</span>' +
                    '<div class="info"><span class="key">This property is ' + (required ? 'required' : 'optional');
                if (property.hasOwnProperty('readOnly') && property.readOnly) {
                    // This is how the Swagger spec defines 'read-only': 
                    result += ' and readonly. It may only occur in response payloads.';
                }
                result += '</span></div>';
                var isArray = property.hasOwnProperty('items');
                var dflt = this.getDefaultValue(property, isArray);
                var valids = this.getValidValues(property, isArray);
                var constraints = this.getConstraints(property, isArray);
                if (dflt != null)
                    result += '</div><div>' + dflt;
                if (constraints != null)
                    result += '</div><div>' + constraints;
                if (valids != null)
                    result += '</div><div>' + valids;
            }
            result += '</td></tr>';
            return result;
        };
        //
        // Formats HTML for any type.
        //
        TextDocumentContentProvider.prototype.getType = function (element, array, caption, nested) {
            if (array === void 0) { array = false; }
            if (caption === void 0) { caption = null; }
            if (nested === void 0) { nested = false; }
            if (element.hasOwnProperty('properties') || element.hasOwnProperty('allOf')) {
                var schema = element;
                if (caption == null)
                    caption = 'Schema';
                if (array)
                    caption += ' array';
                var result = '<ul><li class="collapsed"><h4 class="arrow">' + caption + '</h4>';
                result += '<div class="content">';
                result += '<ul class="get-put"><li>';
                result += this.getSchema(schema, nested);
                result += '</li></ul></div></li></ul>';
                return result;
            }
            else if (element.hasOwnProperty('type')) {
                var type = element.type;
                if (type === 'array') {
                    type = this.getType(element.items, true, caption, nested) + ' array';
                }
                return type;
            }
            else if (element.hasOwnProperty('$ref')) {
                var schema_1 = this.resolveReference(element);
                if (schema_1) {
                    var split = element['$ref'].split('/');
                    return this.getType(schema_1, array, split[2], nested);
                }
            }
            return '';
        };
        //
        // Formats HTML table rows for each header element of a response definition.
        // 
        TextDocumentContentProvider.prototype.getHeaders = function (element, useOuterTable) {
            if (useOuterTable === void 0) { useOuterTable = false; }
            if (element.hasOwnProperty('headers')) {
                var result = useOuterTable ? '' : '<table class="description" width="100%">';
                for (var hdr in element.headers) {
                    var header = element.headers[hdr];
                    var type = this.getType(header);
                    if (useOuterTable) {
                        result += '<tr><td width="3%"/>';
                        result += '<td width="23%" style="padding: .25rem 0 .25rem 0" valign="top">' + this.getHeaderName(hdr, header) + '<span class="type">' + type + '</span></td>';
                        result += '<td width="*" style="padding: .25rem 0 .25rem 0" valign="top"><span class="description">' + this.getDescription(header) + '</span></div>';
                    }
                    else {
                        result += '<tr>';
                        result += '<td width="25%" style="padding: .25rem 0 .25rem 0" valign="top">' + this.getHeaderName(hdr, header) + '<span class="type">' + type + '</span></td>';
                        result += '<td width="*" style="padding: .25rem 0 .25rem 0" valign="top"><span class="description">' + this.getDescription(header) + '</span></div>';
                    }
                }
                result += useOuterTable ? '' : '</table>';
                return result;
            }
            return null;
        };
        //
        // Formats HTML for the default value of a parameter or schema property.
        //
        TextDocumentContentProvider.prototype.getDefaultValue = function (element, isArray) {
            return element.hasOwnProperty('default') && element.default != '' ? ('<span class="value">Default value: ' + element.default + '</span>') : null;
        };
        //
        // Formats HTML spans for valid data values applied to parameters and schema properties
        // that are numbers or strings. Arrays are also handled, with the valid values applied to the
        // elements.
        // 
        TextDocumentContentProvider.prototype.getValidValues = function (element, isArray) {
            var result = '';
            var lead = isArray ? 'Each element value must be ' : 'The value must be ';
            if (element.hasOwnProperty('enum') && element.enum.length > 0) {
                var first = true;
                for (var c in element.enum) {
                    if (!first)
                        result += ', ';
                    result += '"' + element.enum[c] + '"';
                    first = false;
                }
                if (element.enum.length == 1) {
                    result = '<span class="value">' + lead + result + '</span>';
                }
                else {
                    result = '<span class="value">' + lead + 'one of ' + result + '</span>';
                }
            }
            else {
                // Look for ranges of numeric values.
                // Format using ISO-standard mathematical inclusive-exclusive range notation.
                // See: https://en.wikipedia.org/wiki/ISO_31-11 for more details.
                if (element.hasOwnProperty('minimum')) {
                    if (element.hasOwnProperty('maximum')) {
                        result += '<span class="value">' + lead + 'in the range ';
                        result += (element.hasOwnProperty('exclusiveMinimum') && element.exclusiveMinimum) ? '(' : '[';
                        result += element.minimum + ',' + element.maximum;
                        result += (element.hasOwnProperty('exclusiveMaximum') && element.exclusiveMaximum) ? ')' : ']';
                        result += '</span>';
                    }
                    else {
                        result += '<span class="value">' + lead;
                        result += (element.hasOwnProperty('exclusiveMinimum') && element.exclusiveMinimum) ? '>' : '≥';
                        result += element.minimum;
                        result += '</span>';
                    }
                }
                else if (element.hasOwnProperty('maximum')) {
                    result += '<span class="value">' + lead;
                    result += (element.hasOwnProperty('exclusiveMaximum') && element.exclusiveMaximum) ? '<' : '≤';
                    result += element.maximum;
                    result += '</span>';
                }
            }
            return result.length == 0 ? null : result;
        };
        //
        // Formats HTML spans for integer, string, and array constraints. Arrays of integers and strings
        // are handled, with the constraints applied to the array elements.
        // 
        TextDocumentContentProvider.prototype.getConstraints = function (element, isArray) {
            var result = '';
            var lead = isArray ? 'Each element value must be ' : 'The value must be ';
            if (element.hasOwnProperty('minLength')) {
                result += '<span class="value">Minimum length: ' + element.minLength + '. </span>';
            }
            if (element.hasOwnProperty('maxLength')) {
                result += '<span class="value">Maximum length: ' + element.maxLength + '. </span>';
            }
            if (element.hasOwnProperty('minItems')) {
                result += '<span class="value">Minimum number of items: ' + element.minItems + '. </span>';
            }
            if (element.hasOwnProperty('maxItems')) {
                result += '<span class="value">Maximum number of items: ' + element.maxItems + '. </span>';
            }
            if (element.hasOwnProperty('pattern')) {
                result += '<span class="value">' + lead + 'conform to the following regular expression: "' + element.pattern + '". </span>';
            }
            if (element.hasOwnProperty('multipleOf')) {
                result += '<span class="value">' + lead + 'a multiple of ' + element.multipleOf + '. </span>';
            }
            if (element.hasOwnProperty('uniqueItems') && element.uniqueItems) {
                result += '<span class="value">' + lead + 'unique.</span>';
            }
            return result;
        };
        //
        // Formats HTML for the name and client name (if one is set) of an element and format the HTML for it.
        //
        TextDocumentContentProvider.prototype.getName = function (deflt, element) {
            var result = '';
            if (element.hasOwnProperty('name') && element['name'] != '') {
                result += '<span class="termlabel">' + element['name'] + '</span>';
                if (element.hasOwnProperty('x-ms-client-name') && element['x-ms-client-name'] != '') {
                    result += '<span class="type">Client name: ' + element['x-ms-client-name'] + '</span>';
                }
                return result;
            }
            return '<span class="termlabel">' + deflt + '</span>';
        };
        //
        // Formats HTML for the name and client name (if one is set) of a header. This uses slightly different HTML formatting
        // compared with getName(), suitable for inclusion in response listings.
        //
        TextDocumentContentProvider.prototype.getHeaderName = function (deflt, element) {
            var result = '';
            if (element.hasOwnProperty('name') && element['name'] != '') {
                result += '<span class="key">' + element['name'] + '</span>';
                if (element.hasOwnProperty('x-ms-client-name') && element['x-ms-client-name'] != '') {
                    result += '<span class="type">Client name: ' + element['x-ms-client-name'] + '</span>';
                }
                return result;
            }
            return '<span class="key">' + deflt + '</span>';
        };
        //
        // Formats HTML for the element description, or a warning in red color that points out that the description is missing.
        //
        TextDocumentContentProvider.prototype.getDescription = function (element) {
            return element.hasOwnProperty('description') && element.description != '' ? element.description : '<span style="color:red">This element has no description.</span>';
        };
        //
        // This function answers the question 'Is the type an object'? To be one, it has
        // to have a schema, or be an array that has a schema.
        // 
        TextDocumentContentProvider.prototype.isObject = function (schema) {
            schema = this.resolveReference(schema);
            return schema.hasOwnProperty('properties') || schema.hasOwnProperty('allOf') || (schema.hasOwnProperty('items') && this.isObject(schema.items));
        };
        //
        // Resolves a reference to a payload definition, parameter, or response. Only internal document
        // references, that is, those of the form '$ref/{section}/{definition}' are supported. External
        // schema references are ignored.
        //
        TextDocumentContentProvider.prototype.resolveReference = function (reference) {
            // TODO: support external references, too.
            if (reference.hasOwnProperty('$ref')) {
                var ref = reference['$ref'];
                var split = ref.split('/');
                if (split.length == 3 && split[0] === '#' &&
                    this._doc.hasOwnProperty(split[1]) && this._doc[split[1]].hasOwnProperty(split[2])) {
                    return this._doc[split[1]][split[2]];
                }
                return null;
            }
            return reference;
        };
        TextDocumentContentProvider.prototype.getReferencedName = function (reference) {
            // TODO: support external references, too.
            if (reference.hasOwnProperty('$ref')) {
                var ref = reference['$ref'];
                var split = ref.split('/');
                if (split.length == 3 && split[0] === '#' &&
                    this._doc.hasOwnProperty(split[1]) && this._doc[split[1]].hasOwnProperty(split[2])) {
                    return split[2];
                }
            }
            return '';
        };
        return TextDocumentContentProvider;
    }());
    //
    // The following is largely generic code to set up the plugin and register the command it implements.
    //
    var provider = new TextDocumentContentProvider();
    var registration = vscode.workspace.registerTextDocumentContentProvider('swagger-preview', provider);
    vscode.workspace.onDidChangeTextDocument(function (e) {
        if (e.document === vscode.window.activeTextEditor.document) {
            provider.update(previewUri);
        }
    });
    vscode.window.onDidChangeTextEditorSelection(function (e) {
        if (e.textEditor === vscode.window.activeTextEditor) {
            provider.update(previewUri);
        }
    });
    var disposable = vscode.commands.registerCommand('extension.showSwaggerPreview', function () {
        return vscode.commands.executeCommand('vscode.previewHtml', previewUri, vscode.ViewColumn.Two).then(function (success) {
        }, function (reason) {
            vscode.window.showErrorMessage(reason);
        });
    });
    context.subscriptions.push(disposable, registration);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map