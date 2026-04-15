document.addEventListener('DOMContentLoaded', () => {
    // Filter tabs
    const tabs = document.querySelectorAll('.tab-btn');
    const cards = document.querySelectorAll('.advice-card');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.dataset.filter;
            cards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('card-hidden');
                } else {
                    card.classList.add('card-hidden');
                }
            });
        });
    });

    // Expand/collapse advice cards
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('expanded');
        });
    });

    // Handle hash links (e.g., advice.html#networking)
    const hash = window.location.hash.slice(1);
    if (hash) {
        const matchingTab = document.querySelector(`.tab-btn[data-filter="${hash}"]`);
        if (matchingTab) matchingTab.click();

        const targetCard = document.getElementById(hash);
        if (targetCard) {
            setTimeout(() => {
                targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                targetCard.classList.add('expanded');
            }, 300);
        }
    }
});
