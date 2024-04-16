
import { useRef } from 'react';
import EmailEditor, { EditorRef } from 'react-email-editor';

export default function Editor() {
    const emailEditorRef = useRef<EditorRef>(null);

    const exportHtml = () => {
        if (!emailEditorRef.current || !emailEditorRef.current.editor) {
          return;
        }
      emailEditorRef.current.editor.exportHtml((data) => {
        const { design, html } = data;
        console.log('exportHtml', html);
        console.log(design);
      });
    };

    const saveDesign = () => {
        if (!emailEditorRef.current || !emailEditorRef.current.editor) {
            return;
        }
        emailEditorRef.current.editor.saveDesign((design) => {
            console.log('saveDesign', design);
        });
    };
  
    const onReady = () => {
      // editor is ready
      if (!emailEditorRef.current || !emailEditorRef.current.editor) {
        return;
      }
      
      console.log('onReady');
      const templateJson = {
        "counters": {
          "u_column": 1,
          "u_row": 1,
          "u_content_heading": 1,
          "u_content_image": 1
        },
        "body": {
          "id": "cKSY6YVvK4",
          "rows": [
            {
              "id": "S9qWjMVe9P",
              "cells": [
                1
              ],
              "columns": [
                {
                  "id": "WAfMFjyW09",
                  "contents": [
                    {
                      "id": "MYSDh-6xKW",
                      "type": "heading",
                      "values": {
                        "containerPadding": "10px",
                        "anchor": "",
                        "headingType": "h1",
                        "fontWeight": 400,
                        "fontSize": "41px",
                        "textAlign": "left",
                        "lineHeight": "140%",
                        "linkStyle": {
                          "inherit": true,
                          "linkColor": "#0000ee",
                          "linkHoverColor": "#0000ee",
                          "linkUnderline": true,
                          "linkHoverUnderline": true
                        },
                        "displayCondition": null,
                        "_meta": {
                          "htmlID": "u_content_heading_1",
                          "htmlClassNames": "u_content_heading"
                        },
                        "selectable": true,
                        "draggable": true,
                        "duplicatable": true,
                        "deletable": true,
                        "hideable": true,
                        "text": "<strong>Cool Email!!!</strong>"
                      }
                    },
                    {
                      "id": "fFgbHGwoPN",
                      "type": "image",
                      "values": {
                        "containerPadding": "10px",
                        "anchor": "",
                        "src": {
                          "url": "https://assets.unlayer.com/projects/0/1711157761275-omori-emotions-chart.png",
                          "width": 503,
                          "height": 377
                        },
                        "textAlign": "center",
                        "altText": "",
                        "action": {
                          "name": "web",
                          "attrs": {
                            "href": "{{href}}",
                            "target": "{{target}}"
                          },
                          "values": {
                            "href": "https://nitroguy10.github.io",
                            "target": "_blank"
                          }
                        },
                        "displayCondition": null,
                        "_meta": {
                          "htmlID": "u_content_image_1",
                          "htmlClassNames": "u_content_image"
                        },
                        "selectable": true,
                        "draggable": true,
                        "duplicatable": true,
                        "deletable": true,
                        "hideable": true
                      }
                    }
                  ],
                  "values": {
                    "backgroundColor": "",
                    "padding": "0px",
                    "border": {},
                    "borderRadius": "0px",
                    "_meta": {
                      "htmlID": "u_column_1",
                      "htmlClassNames": "u_column"
                    }
                  }
                }
              ],
              "values": {
                "displayCondition": null,
                "columns": false,
                "backgroundColor": "",
                "columnsBackgroundColor": "",
                "backgroundImage": {
                  "url": "",
                  "fullWidth": true,
                  "repeat": "no-repeat",
                  "size": "custom",
                  "position": "center",
                  "customPosition": [
                    "50%",
                    "50%"
                  ]
                },
                "padding": "0px",
                "anchor": "",
                "hideDesktop": false,
                "_meta": {
                  "htmlID": "u_row_1",
                  "htmlClassNames": "u_row"
                },
                "selectable": true,
                "draggable": true,
                "duplicatable": true,
                "deletable": true,
                "hideable": true
              }
            }
          ],
          "headers": [],
          "footers": [],
          "values": {
            "popupPosition": "center",
            "popupWidth": "600px",
            "popupHeight": "auto",
            "borderRadius": "10px",
            "contentAlign": "center",
            "contentVerticalAlign": "center",
            "contentWidth": "500px",
            "fontFamily": {
              "label": "Arial",
              "value": "arial,helvetica,sans-serif"
            },
            "textColor": "#000000",
            "popupBackgroundColor": "#FFFFFF",
            "popupBackgroundImage": {
              "url": "",
              "fullWidth": true,
              "repeat": "no-repeat",
              "size": "cover",
              "position": "center"
            },
            "popupOverlay_backgroundColor": "rgba(0, 0, 0, 0.1)",
            "popupCloseButton_position": "top-right",
            "popupCloseButton_backgroundColor": "#DDDDDD",
            "popupCloseButton_iconColor": "#000000",
            "popupCloseButton_borderRadius": "0px",
            "popupCloseButton_margin": "0px",
            "popupCloseButton_action": {
              "name": "close_popup",
              "attrs": {
                "onClick": "document.querySelector('.u-popup-container').style.display = 'none';"
              }
            },
            "backgroundColor": "#e7e7e7",
            "preheaderText": "",
            "linkStyle": {
              "body": true,
              "linkColor": "#0000ee",
              "linkHoverColor": "#0000ee",
              "linkUnderline": true,
              "linkHoverUnderline": true
            },
            "backgroundImage": {
              "url": "",
              "fullWidth": true,
              "repeat": "no-repeat",
              "size": "custom",
              "position": "center"
            },
            "_meta": {
              "htmlID": "u_body",
              "htmlClassNames": "u_body"
            }
          }
        },
        "schemaVersion": 16
      };
      emailEditorRef.current.editor.loadDesign(templateJson);
    };

    // YOU MUST USE react-email-editor@1.7.7
    // https://github.com/unlayer/react-email-editor/issues/376#issuecomment-1905329171

    return (
        <div className="">
            <div>
                <button onClick={exportHtml}>Export HTML</button>
            </div>

            <div>
                <button onClick={saveDesign}>Save Design</button>
            </div>
            
            <EmailEditor
                ref={emailEditorRef}
                // onLoad={onLoad}
                onReady={onReady}
                minHeight={'800px'}
                editorId='editor'
            />
        </div>
    );
}

