'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    let previewUri = vscode.Uri.parse('swagger-preview://authority/swagger-preview');

    class TextDocumentContentProvider implements vscode.TextDocumentContentProvider {
        private _onDidChange = new vscode.EventEmitter<vscode.Uri>();
        private _doc = null;

        public provideTextDocumentContent(uri: vscode.Uri): string {
            return this.createCssSnippet();
        }

        get onDidChange(): vscode.Event<vscode.Uri> {
            return this._onDidChange.event;
        }

        public update(uri: vscode.Uri) {
            this._onDidChange.fire(uri);
        }

        private createCssSnippet() {
            let editor = vscode.window.activeTextEditor;
            if (!(editor.document.languageId === 'json')) {
                return this.errorSnippet("Active editor doesn't show a JSON document - no properties to preview.")
            }
            return this.extractSnippet();
        }

        private extractSnippet(): string {
            let editor = vscode.window.activeTextEditor;
            let doc = JSON.parse(editor.document.getText());
            this._doc = doc;
            return this.snippet(doc);
        }

        private errorSnippet(error: string): string {
            return `
                <body>
                    ${error}
                </body>`;
        }

        //
        // Formats HTML for a Swagger document.
        //
        private snippet(doc): string {
            
            // To simplify things, the style sheet is defined inside the HTML document.           
            var style =
                `<style>
html {
  font-family: "Segoe WPC", "Segoe UI", "SFUIText-Light", "HelveticaNeue-Light", sans-serif, "Droid Sans Fallback";
  font-size: 10px; }

body {
  font-family: "Segoe WPC", "Segoe UI", "SFUIText-Light", "HelveticaNeue-Light", sans-serif, "Droid Sans Fallback";
  margin: 10px;
  min-width: 300px; }

div, span, p, ul, ol, dl {
  font-size: 1.3rem; }

h1, h2, h3, h4, h5, h6 {
  font-weight: initial; }

ul {
  padding-left: 2rem;
  padding-right: 2rem; }

h1 {
  font-size: 2.4rem;
  font-family: "Segoe UI Semilight", "Segoe UI", "SFUIText-Light", "HelveticaNeue-Light", "Helvetica Neue", sans-serif, "Droid Sans Fallback";
  font-weight: 400;
  margin-top: 2rem;
  margin-bottom: .5rem; }

h2 {
  font-size: 1.6rem;
  font-family: Menlo, Monaco, Consolas, "Droid Sans Mono", "Courier New", monospace, "Droid Sans Fallback";
  color: #0072c6;
  font-weight: 300; }

h3, h4 {
  font-size: 1.6rem;
  color: #692682; }

h4 {
  margin-bottom: 0; }

ul {
  list-style: none; }

.get-put .parameters,
.get-put .responses {
  padding-left: 0; }

.info {
  margin-top: .5rem; }

.key {
  color: #767676;
  padding-right: .75rem;
  font-family: "Segoe UI Semibold", "Segoe UI", "SFUIText-Light", "HelveticaNeue-Light", sans-serif, "Droid Sans Fallback"; }

.termlabel {
  font-size: 1.6rem;
  font-family: "Segoe UI Semibold", "Segoe UI", "SFUIText-Light", "HelveticaNeue-Light", sans-serif, "Droid Sans Fallback";
  color: #333333; }

.optional-required {
  font-family: "Segoe UI Semibold", "Segoe UI", "SFUIText-Light", "HelveticaNeue-Light", sans-serif, "Droid Sans Fallback";
  color: #333333;
  font-weight: 400; }

.type {
  display: block; }

dl {
  position: relative;
  width: 100%;
  margin: 0; }

dt, dd {
  padding: .5rem 0 .5rem 0; }

dt {
  position: absolute;
  width: 25%; }

dd {
  position: relative;
  margin: 0; }
  dd > span, dd > div {
    margin-left: 25%; }

header h1 {
  color: #692682;
  font-size: 3.7rem;
  font-family: "Segoe UI Light", "Segoe UI", "SFUIText-Light", "HelveticaNeue-Light", "Helvetica Neue", sans-serif, "Droid Sans Fallback";
  font-weight: 300; }
  header h1:first-child {
    margin-top: 0; }

header h2 {
  color: #767676;
  font-size: 1.87rem;
  font-family: "Segoe UI Semilight", "Segoe UI", "SFUIText-Light", "HelveticaNeue-Light", "Helvetica Neue", sans-serif, "Droid Sans Fallback";
  font-weight: 400;
  margin-top: 0; }

header ul {
  padding-left: 6px;
  border: 1px solid #dbdbdb;
  border-left: 6px solid #dbdbdb; }

.collapsed .content {
  display: none; }

main .get-put .description:not(:first-of-type) dd::after {
  content: "";
  display: block;
  border-top: 1px solid #dbdbdb;
  margin-top: 1.5rem; }

main .get-put h3 {
  font-size: 1.87rem;
  color: #6c6c6c;
  text-transform: uppercase;
  font-family: "Segoe WPC", "Segoe UI", "SFUIText-Light", "HelveticaNeue-Light", sans-serif, "Droid Sans Fallback";
  font-weight: bold; }

main .arrow {
  cursor: pointer;
  display: block;
  position: relative; }
  main .arrow > h2, main .arrow > h3 {
    cursor: pointer; }
  main .arrow::before {
    -ms-high-contrast-adjust: none;
    position: absolute;
    display: block;
    content: "";
    width: 0;
    height: 0;
    top: 7px;
    border-style: solid;
    border-color: transparent #646465 transparent transparent;
    border-width: 8.4px 8.4px 0 7px;
    left: -21px; }
    @media screen and (-ms-high-contrast: active) {
      main .arrow::before {
        border-color: transparent #fff transparent transparent; } }

main li.collapsed > .arrow::before {
  border-width: 5.6px 5.6px 5.6px 7px;
  left: -15px;
  border-color: transparent transparent transparent #A6A6A6;
  border-left-color: #D4D4D4; }
  @media screen and (-ms-high-contrast: active) {
    main li.collapsed > .arrow::before {
      border-color: transparent transparent transparent #fff;
      border-left-color: #fff; } }

main li.collapsed > .arrow::after {
  -ms-high-contrast-adjust: none;
  position: absolute;
  display: block;
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-color: transparent;
  border-left-color: #f6f6f6;
  border-width: 2px;
  border-left-width: 2px;
  top: 10px;
  left: 0%;
  margin-left: -13px; }
				</style>`

            // Overall formatting logic -- include basic API information in the header.
            var intro = '<body><header>' + this.heading(doc) +
                '<div class="summary"><p>' + this.getDescription(doc.info) + '</p>' +
                '<ul><table>' +
                '<tr><td class="key">Host:</td><td class="value">' + this.getHost(doc) + '</td></tr>' +
                '<tr><td class="key">Schemes:</td><td class="value">' + this.getSchemes(doc) + '</td></tr>' +
                '<tr><td class="key">License:</td><td class="value">' + this.getLicense(doc) + '</td></tr>' +
                this.getConsumes(doc) +
                this.getProduces(doc) +
                '</table></ul></div></header>';

            // Then process the main sections: paths, definitions, parameters, and responses.
            // TODO: Support the security-related sections, too.
            var paths = this.getPaths();           
            var definitions = doc.hasOwnProperty('definitions') ? this.getDefinitions(doc.definitions) : '';
            var parameters = doc.hasOwnProperty('parameters') ? this.getClientParameters(doc.parameters) : '';
            var responses = doc.hasOwnProperty('responses') ? this.getGlobalResponses(doc.responses) : '';

            var result = style + intro + '<main><ul>' +
                paths + definitions + parameters + responses +
                '</ul></main>' + `
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.3/jquery.min.js"></script>
		<script>
			$(document).ready(function(){
				var arrow = $('.arrow');
				arrow.click(function(){
					console.log('test');
					//var content = $(this).siblings('.content');
					var parent = $(this).parent();
					
					if (parent.hasClass('collapsed')) {
						parent.removeClass('collapsed');
					}
					else {
						parent.addClass('collapsed');
					}
					
				});
			});
		</script></body>`

            return result;
        }

        //
        // Formaths the HTML for the heading, which includes the title and version label.
        //
        private heading(doc): string {
            var title = ((doc.info != null && doc.info.title != undefined) ? doc.info.title : '<div">No Document Title</div>');
            var version =
                ((doc.info != null && doc.info.version != undefined) ? doc.info.version : '<div">No Document Version</div>');
            return '<h1>' + title + '</h1><h2>Version ' + version + '</h2>';
        }

        //
        // Retrieves the host information.
        //
        private getHost(doc): string {

            if (doc.hasOwnProperty('host')) {
                return doc.host;
            } else {
                return 'no host specified';
            }
        }

        //
        // Formats HTML for an 'info.license' element.
        //
        private getLicense(doc): string {

            if (doc.hasOwnProperty('info') && doc.info.hasOwnProperty('license')) {
                var result = doc.info.license.name;
                if (doc.info.license)
                    result += ' (<a href="' + doc.info.license.url + '">' + doc.info.license.url + '</a>)';
                return result;
            } else {
                return 'no license specified';
            }
        }

        //
        // Formats HTML for a 'produces' element.
        //
        private getProduces(doc): string {

            var result = '';

            if (doc.hasOwnProperty('produces') && doc.produces.length > 0) {
                result += '<tr><td class="key">Produces:</td><td class="value">';
                for (var c in doc.produces) {
                    result += doc.produces[c] + '&nbsp;'
                }
                result += '</td></tr>';
            }

            return result;
        }

        //
        // Formats HTML for a 'consumes' element.
        //
        private getConsumes(doc): string {

            var result = '';

            if (doc.hasOwnProperty('consumes') && doc.consumes.length > 0) {
                result += '<tr><td class="key">Consumes:</td><td class="value">';
                for (var c in doc.consumes) {
                    result += doc.consumes[c] + '&nbsp;'
                }
                result += '</td></li>';
            }

            return result;
        }
        
        //
        // Retrieves the declared protocols supported by the API.
        //
        private getSchemes(doc): string {

            var result = '';

            if (doc.hasOwnProperty('schemes')) {
                for (var key in doc.schemes) {
                    result += doc.schemes[key] + '&nbsp;';
                }
            } else {
                result = 'no schemes specified';
            }

            return result;
        }

        //
        // Formats HTML for all the path elements under the 'paths' and 'x-ms-paths' sections of the Swagger doc.
        //
        private getPaths(): string {

            var result = '<li><h1 class="arrow">Service Paths</h1><ul id="service_paths">';
            
            // Merge the standard Swagger 'paths' and the Microsoft-specific 'x-ms-paths' sections
            
            var paths = {}
            
            if (this._doc.hasOwnProperty('paths')) {         
                for (var key in this._doc.paths) {
                    paths[key] = this._doc.paths[key];                    
                }
            }
            
            if (this._doc.hasOwnProperty('x-ms-paths')) {         
                for (var key in this._doc['x-ms-paths']) {
                    if (paths[key]) {
                        for (var k in this._doc['x-ms-paths'][key]) {
                            paths[key][k] = this._doc['x-ms-paths'][key][k]
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
                result += '<div class="content">'

                if (element.hasOwnProperty('parameters') && element.parameters.length > 0) {
                    result += '<h3 class="parameters-all">Parameters for All Operations</h3>';
                    result += this.getOperationParameters('Parameters for All Methods', element);
                }

                result += this.getOperations(element);

                result += '</div></li>';
            }
            return result + '</ul></li>';
        }

        //
        // Formats HTML for the operations of a path element.
        //
        private getOperations(path): string {

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
                
                result += '<div class="content">'
                if (element.hasOwnProperty('description')) {
                    result += '<div class="definition">' + this.getDescription(element) + '</div>'
                }
                
                result += '<ul><li>'
                if (element.hasOwnProperty('operationId')) {
                    var ids = element.operationId.split('_');
                    result += '<table>'
                    if (ids.length == 1) {
                        result += '<tr><td>Operation Id</td><td>' + element.operationId + '</td></tr>'
                    } else if (ids.length == 2) {
                        result += '<tr><td class="key">Group:</td><td class="value">' + ids[0] + '</td></tr>'
                        result += '<tr><td class="key">Operation:</td><td class="value">' + ids[1] + '</td></tr>'
                    }
                    result += this.getConsumes(element);
                    result += this.getProduces(element);
                    result += '</table>'
                }
                result += '</li></ul>'

                if (element.hasOwnProperty('parameters') && element.parameters.length > 0) {
                    result += '<h4>Parameters</h4>';
                    result += this.getOperationParameters('Parameters', element);
                }

                if (element.hasOwnProperty('responses')) {
                    result += this.getOperationResponses(element.responses);
                }
                result += '</div></li>'
            }

            return result + '</ul>';
        }

        //
        // Formats HTML for the parameter definitions under a specific operation.
        //
        private getOperationParameters(caption, operation): string {

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
        }

        //
        // Formats HTML for the definitions in the top-level 'parameters' section.
        //
        private getClientParameters(parameters): string {

            var result = '<li><h1 class="arrow">Client (Global) Parameters</h1><ul>'
            result += '<div class="content">'

            for (var key in parameters) {
                var parameter = parameters[key];

                result += '<li id="schema' + key + '"><h2  class="arrow" style="font-size: 1.87rem">' + key + '</h2>';
                result += '<div class="content">'
                result += '<table width="100%" class="description">';
                result += this.getParameter(parameter);
                result += '</table></div></li>';
            }

            return result + '</div></ul></li>';
        }

        //
        // Formats HTML containing information about a parameter.
        //
        private getParameter(parameter): string {

            var result = '';

            parameter = this.resolveReference(parameter);
            
            if (parameter == null) return '';
            
            if (parameter.hasOwnProperty('name')) {

                var isObject = parameter.hasOwnProperty('schema') && this.isObject(parameter.schema);     
                var isArray = parameter.hasOwnProperty('items');       
                var type = this.getType(isObject ? parameter.schema : parameter);                     
                
                var required = (parameter.hasOwnProperty('required') && parameter.required);

                result += '<tr><td width="1%"/>'
                
                // The formatted HTML is quite different for object types (and arrays of object types) and all others.
                
                if (isObject) {
                    result += '<td width="25%" style="padding: 1.0rem 0 1.0rem 0" valign="top">' + this.getName('No Name', parameter) + '</td>';
                    result += '<td width="*" style="padding: 1.0rem 0 1.0rem 0"><span class="description" valign="top">' + this.getDescription(parameter) + '</span>' +
                        '<div class="info"><span class="value">This parameter is ' + (required ? 'required' : 'optional') + ' and passed in ' + this.getParameterLocation(parameter) + '</span>';
                    result += '</div></td>';
                    result += '<tr><td width="1%"/><td width="*" colspan="2"><span class="type">' + type + '</span></td>';                                                               
                } else {
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
        }

        //
        // Formats a phrase indicating the location of a parameter (body, path, header, etc.)
        //  
        private getParameterLocation(parameter): string {

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
        }

        //
        // Formats HTML for the responses defined in the top-level 'responses' section.
        //
        private getGlobalResponses(responses): string {

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
        }

        //
        // Formats HTML for the responses defined under a specific operation.
        //
        private getOperationResponses(responses): string {

            var result = '<h4>Responses</h4>';
            result += '<ul class="responses">';

            for (var key in responses) {
                result += '<li><table width="100%" class="description">'
                var response = responses[key];
                result += this.getOperationResponse(key, response);
                result += '</table></li>'
            }

            result += '</ul>';
            return result;
        }

        //
        // Formats HTML for a response found under the top-level 'responses' section.
        //
        private getGlobalResponse(key, response) : string {

            var result = '';
            var isObject = response.hasOwnProperty('schema') && this.isObject(response.schema);           
            var type = this.getType(response.hasOwnProperty('schema') ? response.schema : response);
            
            var headers = this.getHeaders(response, isObject);
            
            result += '<tr><td width="1%"/>'
            if (isObject) {
                result += '<td width="25%" style="padding: 1.0rem 0 1.0rem 0" valign="top" colspan="2"><span class="description">' + this.getDescription(response) + '</span></td>';
                result += '<tr><td width="1%"/><td width="*" colspan="2"><span class="type">' + type + '</span></td>'                                           
                if (headers) {
                    result += '</td></tr><tr><td width="1%"/><td width="*" colspan="2">'
                    result += '<div class="info"><span class="termlabel" style="font-size: 1.50rem;color: #692682">Headers</span></div>'
                    result += '<div class="info"><span class="termlabel">' + headers + '</span></div>'
                }
            } else {
                result += '<td width="25%" style="padding: 1.0rem 0 1.0rem 0" valign="top"><span class="termlabel">' + key + '</span><span class="type">' + type + '</span></td>';
                result += '<td width="*" style="padding: 1.0rem 0 1.0rem 0" valign="top"><span class="description">' + this.getDescription(response) + '</span>'                           
                if (headers) {
                    result += '<div class="info"><span class="termlabel" style="font-size: 1.50rem;color: #692682">Headers</span></div>'
                    result += '<div class="info"><span class="termlabel">' + headers + '</span></div>'
                }
            }
            
            return result + '</td></tr>';
        }

        //
        // Formats HTML for a response found under an operation. The formatting is very similar to what the previous
        // method produces, but not exactly the same, so two methods is the easiest way to deal with it. 
        //
        private getOperationResponse(key, response): string {

            var result = '';
            var schema = response.schema;           
            var isObject = response.hasOwnProperty('schema') && this.isObject(response.schema);            
            var type = this.getType(response.hasOwnProperty('schema') ? response.schema : response);
            
            var headers = this.getHeaders(response, isObject);
            
            result += '<tr><td width="1%"/>'
            
            if (isObject) {
                result += '<td width="25%" style="padding: 1.0rem 0 1.0rem 0" valign="top"><span class="termlabel">' + key + '</span></td>';
                result += '<td width="*" style="padding: 1.0rem 0 1.0rem 0" valign="top"><span class="description">' + this.getDescription(response) + '</span></td></tr>'
                if (headers) {
                    result += '<tr><td width="1%"/><td width="*" colspan="2">'
                    result += '<div class="info"><span class="termlabel" style="font-size: 1.50rem;color: #692682">Headers</span></div>'
                    result += '<div class="info"><span class="termlabel">' + headers + '</span></div></td></tr>'
                }
                result += '<tr><td width="1%"/><td width="*" colspan="2"><span class="type">' + type + '</span>'                                           
            } else {
                result += '<td width="25%" style="padding: 1.0rem 0 1.0rem 0" valign="top"><span class="termlabel">' + key + '</span><span class="type">' + type + '</span></td>';
                result += '<td width="*" style="padding: 1.0rem 0 1.0rem 0" valign="top"><span class="description">' + this.getDescription(response) + '</span>'                           
                if (headers) {
                    result += '<div class="info"><span class="termlabel" style="font-size: 1.50rem;color: #692682">Headers</span></div>'
                    result += '<div class="info"><span class="termlabel">' + headers + '</span></div>'
                }
            }
            
            return result + '</td></tr>';
        }

        //
        // Formats HTML for the 'definitions' section of the Swagger document
        //
        private getDefinitions(definitions): string {

            var result = '<li><h1 class="arrow" >Definitions</h1><ul>'

            for (var key in definitions) {
                
                var definition = definitions[key];

                result += '<li><h2 class="arrow" style="font-size: 1.87rem">' + key + '</h2>';

                result += '<div class="content">'
                result += '<p>' + this.getDescription(definition) + '</p>'

                result += '<ul class="get-put"><li>'

                result += this.getSchema(definition);

                result += '</li></ul></div>'
            }

            return result + '</ul></li>';
        }

        //
        // Formats HTML for a schema type.
        //
        private getSchema(schema, nested=false): string {

            var result = '';
            
            schema = this.resolveReference(schema);
            
            if (schema == null) return '';

            result += '<h4>Properties</h4>';
            
            result += '<ul class="parameters"><li>';
            
            if (nested) {
                // There's currently a problem formatting nested schema information, since the column get very narrow. Therefore, omit
                // some of the descriptive information when nested.
                result += '<span class="description">Please see the "definitions" entry for the schema for full details.</span>';               
            }

            result += '<table class="description" width="100%">'

            for (var p in schema.properties) {
                
                var property = schema.properties[p];
                var required = schema.hasOwnProperty('required') && (schema.required.indexOf(p) > -1);

                result += '<tr><td width=".5%"/>'
                result += '<td width="25%" style="padding: 1.0rem 0 1.0rem 0" valign="top">' + this.getName(p, property) + '<span class="type">' + this.getType(property,false, null, true) + '</span></td>';

                if (nested) {
                    result += '<td width="*" style="padding: 1.0rem 0 1.0rem 0" valign="top">';                    
                } else {
                    result += '<td width="*" style="padding: 1.0rem 0 1.0rem 0" valign="top"><span class="description">' + this.getDescription(property) + '</span>' +
                              '<div class="info"><span class="key">This property is ' + (required ? 'required' : 'optional');

                    if (property.hasOwnProperty('readOnly') && property.readOnly) {
                        // This is how the Swagger spec defines 'read-only': 
                        result += ' and readonly. It may only occur in response payloads.'
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
                result += '</td></tr>'
            }
            result += '</table>'
            result += '</li></ul>';

            return result;
        }

        //
        // Formats HTML for any type.
        //
        private getType(element, array=false, caption=null, nested=false): string {

            if (element.hasOwnProperty('properties')) {
                
                var schema = element;
                
                if (caption == null)
                    caption = 'Schema';
                   
                if (array)
                    caption += ' array'
                    
                var result = '<ul><li class="collapsed"><h4 class="arrow">' + caption + '</h4>';

                result += '<div class="content">'

                result += '<ul class="get-put"><li>'
                result += this.getSchema(schema, nested);
                result += '</li></ul></div></li></ul>'       
                return result;           
            } else if (element.hasOwnProperty('type')) {
                var type = element.type;
                if (type === 'array') {
                    type = this.getType(element.items, true, caption, nested) + ' array';
                }
                return type;
            } else if (element.hasOwnProperty('$ref')) {
                
                let schema = this.resolveReference(element);           

                if (schema)
                {
                    var split = element['$ref'].split('/');
                    return this.getType(schema, array, split[2], nested);
                }
            }
            
            return '';
        }

        //
        // Formats HTML table rows for each header element of a response definition.
        // 
        private getHeaders(element, useOuterTable=false): string {

            if (element.hasOwnProperty('headers')) {
                var result = useOuterTable ? '' : '<table class="description" width="100%">';
                for (var hdr in element.headers) {
                    var header = element.headers[hdr];
                    var type = this.getType(header);
                    if (useOuterTable) { 
                        result += '<tr><td width="3%"/>'
                        result += '<td width="23%" style="padding: .25rem 0 .25rem 0" valign="top">' + this.getHeaderName(hdr, header) + '<span class="type">' + type + '</span></td>';
                        result += '<td width="*" style="padding: .25rem 0 .25rem 0" valign="top"><span class="description">' + this.getDescription(header) + '</span></div>';                       
                    } else {
                        result += '<tr>'
                        result += '<td width="25%" style="padding: .25rem 0 .25rem 0" valign="top">' + this.getHeaderName(hdr, header) + '<span class="type">' + type + '</span></td>';
                        result += '<td width="*" style="padding: .25rem 0 .25rem 0" valign="top"><span class="description">' + this.getDescription(header) + '</span></div>';
                    }
                }
                result += useOuterTable ? '' : '</table>'
                return result;
            }

            return null;
        }

        //
        // Formats HTML for the default value of a parameter or schema property.
        //
        private getDefaultValue(element, isArray : boolean) {
            return element.hasOwnProperty('default') && element.default != '' ? ('<span class="value">Default value: ' + element.default + '</span>') : null;
        }

        //
        // Formats HTML spans for valid data values applied to parameters and schema properties
        // that are numbers or strings. Arrays are also handled, with the valid values applied to the
        // elements.
        // 
        private getValidValues(element, isArray : boolean) : string {
            
            var result =''

            var lead = isArray ? 'Each element value must be ' : 'The value must be ';

            if (element.hasOwnProperty('enum') && element.enum.length > 0) {
                var first = true
                for (var c in element.enum) {
                    if (!first) result += ', '
                    result += '"' + element.enum[c] + '"'
                    first = false
                }        
                if (element.enum.length == 1) {
                    result = '<span class="value">' + lead + result + '</span>';                    
                } else {
                    result = '<span class="value">' + lead + 'one of ' + result + '</span>';
                }
            } else {
                // Look for ranges of numeric values.
                // Format using ISO-standard mathematical inclusive-exclusive range notation.
                // See: https://en.wikipedia.org/wiki/ISO_31-11 for more details.
                if (element.hasOwnProperty('minimum')) {
                    if (element.hasOwnProperty('maximum')) {
                        result += '<span class="value">' + lead + 'in the range ';
                        result += (element.hasOwnProperty('exclusiveMinimum') && element.exclusiveMinimum) ? '(' : '[';
                        result += element.minimum + ',' + element.maximum                       
                        result += (element.hasOwnProperty('exclusiveMaximum') && element.exclusiveMaximum) ? ')' : ']';
                        result += '</span>'
                    } else {
                        result += '<span class="value">' + lead;
                        result += (element.hasOwnProperty('exclusiveMinimum') && element.exclusiveMinimum) ? '>' : '≥';
                        result += element.minimum;
                        result += '</span>'
                    }                    
                } else if (element.hasOwnProperty('maximum')) {
                    result += '<span class="value">' + lead;
                    result += (element.hasOwnProperty('exclusiveMaximum') && element.exclusiveMaximum) ? '<' : '≤';
                    result += element.maximum;                   
                    result += '</span>'
                }
            }
            
            return result.length == 0 ? null : result;
        }
        
        //
        // Formats HTML spans for integer, string, and array constraints. Arrays of integers and strings
        // are handled, with the constraints applied to the array elements.
        // 
        private getConstraints(element, isArray : boolean) : string {

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
        }

        //
        // Formats HTML for the name and client name (if one is set) of an element and format the HTML for it.
        //
        private getName(deflt, element): string {

            var result = '';

            if (element.hasOwnProperty('name') && element['name'] != '') {
               
                result += '<span class="termlabel">' + element['name'] + '</span>'
               
                if (element.hasOwnProperty('x-ms-client-name') && element['x-ms-client-name'] != '') {
                    result += '<span class="type">Client name: ' + element['x-ms-client-name'] + '</span>'
                }
                
                return result;
            }

            return '<span class="termlabel">' + deflt + '</span>';
        }

        //
        // Formats HTML for the name and client name (if one is set) of a header. This uses slightly different HTML formatting
        // compared with getName(), suitable for inclusion in response listings.
        //
        private getHeaderName(deflt, element): string {

            var result = '';

            if (element.hasOwnProperty('name') && element['name'] != '') {
                
                result += '<span class="key">' + element['name'] + '</span>'
                
                if (element.hasOwnProperty('x-ms-client-name') && element['x-ms-client-name'] != '') {
                    result += '<span class="type">Client name: ' + element['x-ms-client-name'] + '</span>'
                }
                
                return result;
            }

            return '<span class="key">' + deflt + '</span>';
        }

        //
        // Formats HTML for the element description, or a warning in red color that points out that the description is missing.
        //
        private getDescription(element): string {
            return element.hasOwnProperty('description') && element.description != '' ? element.description : '<span style="color:red">This element has no description.</span>';
        }
        
        //
        // This function answers the question 'Is the type an object'? To be one, it has
        // to have a schema, or be an array that has a schema.
        // 
        private isObject(schema) : boolean {
            
            schema = this.resolveReference(schema);          
             
            return schema.hasOwnProperty('properties') ||
                   (schema.hasOwnProperty('items') && this.isObject(schema.items)); 
        }        
        
        //
        // Resolves a reference to a payload definition, parameter, or response. Only internal document
        // references, that is, those of the form '$ref/{section}/{definition}' are supported. External
        // schema references are ignored.
        //
        private resolveReference(reference)
        {
            // TODO: support external references, too.
            if (reference.hasOwnProperty('$ref')) {
                
                let ref = reference['$ref'];
                let split = ref.split('/');
                
                if (split.length == 3 && split[0] === '#' && 
                    this._doc.hasOwnProperty(split[1]) && this._doc[split[1]].hasOwnProperty(split[2])) {
                        
                    return this._doc[split[1]][split[2]];
                }           
                
                return null;     
            }
            
            return reference; 
        }
    }

    //
    // The following is largely generic code to set up the plugin and register the command it implements.
    //
    let provider = new TextDocumentContentProvider();
    let registration = vscode.workspace.registerTextDocumentContentProvider('swagger-preview', provider);

    vscode.workspace.onDidChangeTextDocument((e: vscode.TextDocumentChangeEvent) => {
        if (e.document === vscode.window.activeTextEditor.document) {
            provider.update(previewUri);
        }
    });

    vscode.window.onDidChangeTextEditorSelection((e: vscode.TextEditorSelectionChangeEvent) => {
        if (e.textEditor === vscode.window.activeTextEditor) {
            provider.update(previewUri);
        }
    })

    let disposable = vscode.commands.registerCommand('extension.showSwaggerPreview', () => {
        return vscode.commands.executeCommand('vscode.previewHtml', previewUri, vscode.ViewColumn.Two).then((success) => {
        }, (reason) => {
            vscode.window.showErrorMessage(reason);
        });

    });
    context.subscriptions.push(disposable, registration);
}

export function deactivate() {
}