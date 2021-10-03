const pool = require("../db/index.js");

// Sort Reviews (Sort)
const sortReviews = async (id, sort_by, count) => {
  if (sort_by === "relevant") {
    sort_by = 'rating"';
  }
  if (sort_by === "newest") {
    sort_by = "date_written";
  }
  let sortReviewQuery =
    "select id, product_id, rating, summary, body, recommend, reviewer_name, response, helpfulness, date_written, photos from reviews, lateral ( select json_agg ( json_build_object ( 'id', reviewsphotos.id, 'url', reviewsphotos.url )) as photos from reviewsphotos where reviewsphotos.review_id = reviews.id ) as photos where reviews.product_id = $1 order by $2 desc fetch first $3 rows only";

  try {
    const sortedReviews = await pool.query(sortReviewQuery, [
      id,
      sort_by,
      count,
    ]);
    console.log("sorted review", sortedReviews.rows);
    return sortedReviews.rows;
  } catch (errorGettingReviews) {
    return errorGettingReviews.stack;
  }
};

//  Post A Review (Insert)
const postProductReview = (reviewValues) => {
  let postReviewQuery =
    "insert into reviews(product_id, rating, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness, date_written) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";
  pool
    .query(postReviewQuery, reviewValues)
    .then((successfulPost) => {
      return successfulPost;
    })
    .catch((errorPostingReview) => {
      return errorPostingReview;
    });
};

//  Report A Review (Update)
const reportProductReview = (id) => {
  let reportProductReviewQuery = "Update reviews set reported=true where id=$1";
  pool
    .query(reportProductReviewQuery, [id])
    .then((successfulReport) => {
      return successfulReport;
    })
    .catch((errorReportingReview) => {
      return errorReportingReview;
    });
};

module.exports = {
  reportProductReview,
  postProductReview,
  sortReviews,
};
