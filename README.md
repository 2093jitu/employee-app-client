# MedicareWebClientV2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## For Tinymce line height
Need to replace below code for v5.0.3  
node_modules/tinymce-line-height-plugin/lineheight/ plugin.js



(function (tinymce) {
    tinymce.PluginManager.add('lineheight', function (editor, url, $) {

        editor.on('init', function () {
            editor.formatter.register({
                lineheight: {
                    block: 'div',
                    styles: {
                        'line-height': '%value'
                    }
                }
            });
        });

        editor.ui.registry.addMenuButton('lineheightselect', {
                 tooltip: 'Paragraph Line Height',
                icon: 'border-width',
                fetch: function (callback) {
                    var items = [], defaultLineHeightFormats = '8pt 10pt 12pt 14pt 18pt 24pt 36pt';
                    var lineheight_formats = editor.settings.lineheight_formats || defaultLineHeightFormats;
                    lineheight_formats.split(' ').forEach(function(item) {
                        //var text = item, value = item;
                        var value = item;
                        // Allow text=value for line-height formats
                        var values = item.split('=');
                        if (values.length > 1) {
                            //text = values[0];
                            value = values[1];
                        }
                        items.push({
                            type: 'menuitem',
                            text: value,
                            onAction: function (_) {
                                tinymce.activeEditor.formatter.apply('lineheight', {
                                    value : value
                                });

                                var j = editor.getWin().parent.jQuery;
                                j('#' + j('#path').val()).find(j('#selector').val()).html(tinymce.activeEditor.getContent());
                            }
                        });
                    });
                    callback(items);
                }
            }
        );
    });

    tinymce.PluginManager.requireLangPack('lineheight', 'de');
})(tinymce);
