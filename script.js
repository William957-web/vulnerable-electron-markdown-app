document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.md')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('markdownEditor').value = e.target.result;
            updatePreview();
        };
        reader.readAsText(file);
    } else {
        alert('Please upload a valid Markdown file.');
    }
});

document.getElementById('markdownEditor').addEventListener('input', updatePreview);

function updatePreview() {
    const markdownText = document.getElementById('markdownEditor').value;
    const htmlContent = marked.marked(markdownText);
    document.getElementById('markdownPreview').innerHTML = htmlContent;
}

function downloadMarkdown() {
    const markdownText = document.getElementById('markdownEditor').value;
    const blob = new Blob([markdownText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
