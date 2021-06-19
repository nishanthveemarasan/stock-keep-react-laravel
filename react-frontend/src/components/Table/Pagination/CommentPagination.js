const CommentPagination = (props) => {
  const to = props.paginationData?.to;
  const total = props.paginationData?.total;
  const links = props.paginationData?.links;
  const pageChangeHandler = (url) => {
    props.pageChangeHandler(url);
  };
  return (
    <nav className="d-flex justify-content-start">
      <div className="align-self-center mr-3 font-weight-bold">
        <span>{to && to} of </span>
        <span>{total && total}</span>
      </div>
      <ul className="pagination">
        {links &&
          links.map((link, index) => {
            return (
              <li
                key={index}
                className={`page-item ${link.active && "active"}`}
              >
                {index === 0 && (
                  <span
                    className="page-link"
                    onClick={pageChangeHandler.bind(null, link.url)}
                  >
                    &laquo;
                  </span>
                )}
                {index === links.length - 1 && (
                  <span
                    className="page-link"
                    onClick={pageChangeHandler.bind(null, link.url)}
                  >
                    &raquo;
                  </span>
                )}
                {index !== 0 && index !== links.length - 1 && (
                  <span
                    className="page-link"
                    onClick={pageChangeHandler.bind(null, link.url)}
                  >
                    {link.label}
                  </span>
                )}
              </li>
            );
          })}
      </ul>
    </nav>
  );
};

export default CommentPagination;
