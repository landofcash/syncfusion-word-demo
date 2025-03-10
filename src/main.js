import './main.css';


let documenteditorContainer = undefined;

document.addEventListener('DOMContentLoaded', () => {
    initEditor();
    document.getElementById('toggleButton').addEventListener('click', toggle);
    document.getElementById('showDataButton').addEventListener('click', showFormData);
});

function initEditor(){
    documenteditorContainer = new ej.documenteditor
        .DocumentEditorContainer({enableToolbar: true, height: '590px', width: 'default'});
    ej.documenteditor.DocumentEditorContainer.Inject(ej.documenteditor.Toolbar);
    documenteditorContainer.serviceUrl = 'https://services.syncfusion.com/js/production/api/documenteditor/';
    documenteditorContainer.appendTo('#DocumentEditor');
}


function toggle() {
    let editor = documenteditorContainer.documentEditor.editor;
    if(editor.currentProtectionType!=="FormFieldsOnly"){
        editor.enforceProtection('123', 'FormFieldsOnly');
    } else{
        editor.stopProtection('123', 'FormFieldsOnly');
        editor.currentProtectionType = undefined;
    }
}

function showFormData() {
    let data={
        FormFields:[],
        ContentFields:[]
    }
    let documentEditor = documenteditorContainer.documentEditor;
    data.FormFields = documentEditor.exportFormData();
    data.ContentFields = documentEditor.exportContentControlData();

    const documentFieldsData = document.querySelector('#documentFieldsData');
    documentFieldsData.value = JSON.stringify(data, null, 2);
}
