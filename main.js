// Echo 47 // Split Signal - Main JavaScript

class ArticleFeed {
  constructor() {
    this.articles = [];
    this.currentPage = 0;
    this.articlesPerPage = 10;
    this.init();
  }

  async init() {
    try {
      await this.loadArticles();
      this.render();
    } catch (error) {
      this.showError('Failed to load transmissions. Check back later.');
      console.error('Load error:', error);
    }
  }

  async loadArticles() {
    const response = await fetch('articles.json');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    this.articles = data.articles || [];
  }

  render() {
    const container = document.getElementById('main-content');
    
    if (this.articles.length === 0) {
      container.innerHTML = '<div class="loading">⟨ NO TRANSMISSIONS AVAILABLE ⟩</div>';
      return;
    }

    const start = this.currentPage * this.articlesPerPage;
    const end = start + this.articlesPerPage;
    const pageArticles = this.articles.slice(start, end);

    const articlesHtml = pageArticles.map(article => this.createArticleCard(article)).join('');
    const paginationHtml = this.createPagination();

    container.innerHTML = articlesHtml + paginationHtml;
    
    // Attach pagination event listeners
    this.attachPaginationListeners();
  }

  createArticleCard(article) {
    const date = new Date(article.timestamp);
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });

    return `
      <article class="article-card">
        <div class="article-meta">
          <span class="timestamp">${formattedDate} • ${formattedTime}</span>
        </div>
        
        <h2 class="article-headline">
          <a href="${article.url}" target="_blank" rel="noopener">
            ${this.escapeHtml(article.headline)}
          </a>
        </h2>

        <div class="dispatch-grid">
          <div class="dispatch-column">
            <div class="dispatch-label">━━━ RESISTANCE DISPATCH ━━━</div>
            <div class="dispatch-preview">
              ${this.escapeHtml(article.nemikPreview)}
            </div>
          </div>
          
          <div class="dispatch-column">
            <div class="dispatch-label">━━━ ISB DIRECTIVE ━━━</div>
            <div class="dispatch-preview">
              ${this.escapeHtml(article.partigazPreview)}
            </div>
          </div>
        </div>

        <div class="source-link">
          <a href="${article.detailPage}">⟨ READ FULL ANALYSIS ⟩</a> • 
          SOURCE: ${this.escapeHtml(article.source)}
        </div>
      </article>
    `;
  }

  createPagination() {
    const totalPages = Math.ceil(this.articles.length / this.articlesPerPage);
    
    if (totalPages <= 1) return '';

    const prevDisabled = this.currentPage === 0;
    const nextDisabled = this.currentPage >= totalPages - 1;

    return `
      <div class="pagination">
        <button id="prev-page" ${prevDisabled ? 'disabled' : ''}>
          ⟨ PREVIOUS
        </button>
        <span style="color: #666; margin: 0 16px;">
          PAGE ${this.currentPage + 1} OF ${totalPages}
        </span>
        <button id="next-page" ${nextDisabled ? 'disabled' : ''}>
          NEXT ⟩
        </button>
      </div>
    `;
  }

  attachPaginationListeners() {
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.currentPage--;
        this.render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.currentPage++;
        this.render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  showError(message) {
    const container = document.getElementById('main-content');
    container.innerHTML = `<div class="error">⟨ ERROR ⟩ ${this.escapeHtml(message)}</div>`;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  new ArticleFeed();
});
