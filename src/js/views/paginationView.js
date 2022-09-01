import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      console.log(btn);

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateBtnNext(curPage) {
    return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1} </span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> 
    `;
  }
  _generateBtnPrev(curPage) {
    return `
          <button data-goto="${
            curPage - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
    `;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPage = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // page 1 and others
    if (curPage === 1 && numPage > 1) return this._generateBtnNext(curPage);
    // others
    if (curPage < numPage)
      return `
    ${this._generateBtnNext(curPage)}${this._generateBtnPrev(curPage)};
      `;

    // last page
    if (curPage === numPage && numPage > 1)
      return this._generateBtnPrev(curPage);
    // only 1 page
    return '';

    // // page 1 and others
    // if (curPage === 1 && numPage > 1)
    //   return
    //   `  <button class="btn--inline pagination__btn--next">
    //       <span>Page ${curPage + 1} </span>
    //         <svg class="search__icon">
    //           <use href="${icons}#icon-arrow-right"></use>
    //         </svg>
    //       </button>
    // `
    // // others
    // if (curPage < numPage)
    // return
    // `   <button class="btn--inline pagination__btn--prev">
    //         <svg class="search__icon">
    //           <use href="${icons}#icon-arrow-left"></use>
    //         </svg>
    //         <span>Page ${curPage - 1}</span>
    //       </button>
    //       `;

    // // last page
    // if (curPage === numPage && numPage > 1)
    //   return `
    //       <button class="btn--inline pagination__btn--prev">
    //         <svg class="search__icon">
    //           <use href="${icons}#icon-arrow-left"></use>
    //         </svg>
    //         <span>Page ${curPage - 1}</span>
    //       </button>
    //     <button class="btn--inline pagination__btn--next">
    //       <span>Page ${curPage + 1} </span>
    //         <svg class="search__icon">
    //           <use href="${icons}#icon-arrow-right"></use>
    //         </svg>
    //     </button>
    // `
    // // only 1 page
    // // if (numPage === 1)
    // return '';
  }
}

export default new PaginationView();
