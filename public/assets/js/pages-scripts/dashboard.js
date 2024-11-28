document.addEventListener('DOMContentLoaded', () => {
    const jQuery = $;
    const { hash } = location;
    const curTabEl = jQuery("[data-bs-target="+ hash +"]");
    const curTab = new bootstrap.Tab(curTabEl);

    curTab.show();
});