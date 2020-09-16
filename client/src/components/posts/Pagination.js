import React, { useEffect } from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  //Add the 'selected-page' class and styling to the first page button only once on a reload of the page
  useEffect(() => {
    document.querySelectorAll(".page-button")[0].classList.add('selected-page');
  }, []);
  
  function selectedPage(e) {

    const pagebuttons = document.querySelectorAll(".page-button");
    // Remove selected-page class from all buttons
    pagebuttons.forEach(function(pagebutton) {
        pagebutton.classList.remove('selected-page');
    })
    // Add selected-page class to the clicked button
     e.target.classList.add('selected-page');
     window.scrollTo(0, 0)
  }

  return (
    <div className="page-buttons">
        {pageNumbers.map(number => (
          <button key={number} 
          onClick={(e) => {
          paginate(number);
          selectedPage(e);
            }} className="page-button">
              {number}
          </button>
        ))}
    </div>
  );
};

export default Pagination;