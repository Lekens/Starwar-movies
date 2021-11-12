import sql from './db.js';

const Comment = function(comment) {
    this.movie_title = comment.movie_title;
    this.comment = comment.comment;
    this.commenter_ip = comment.commenter_ip;
    this.date = comment.date;
};


Comment.create = (newComment, callback) => {
    sql.query("INSERT INTO comments SET ?", newComment, (err, res) => {
        if (err) {
            console.log("error: ", err);
            callback(err, null);
            return;
        }

        console.log("create comment: ", { id: res.insertId, ...newComment });
        callback(null, { id: res.insertId, ...newComment });
    });
};
Comment.getAll = (title, callback) => {
    let query = `SELECT * FROM comments WHERE movie_title="${title}" ORDER BY id DESC`;
    sql.query(query, async (err, comments) => {
        if (err) {
            callback({ err, code: '00' })
        } else {
            callback({ comments: comments || [], code: '01' })
        }
    });
};

Comment.deleteAllByTitle = (title, callback) => {
    let query = `DELETE FROM comments WHERE movie_title="${title}"`;
    sql.query(query, async (err, response) => {
        if (err) {
            callback({ err, code: '00' })
        }
        if (response.affectedRows === 0) {
            callback({ message: "Comment not found", code: '00' });
        } else {
            callback({ response: response || [], code: '01' })
        }
    });
};

Comment.countComment = async (movie) => {
    let query = `SELECT COUNT(id) FROM comments WHERE movie_title="${movie.title}"`;
    await sql.query(query, async (err, count) => {
        if (err) {
            return 0;
        }
        return await count;
    });
}
export default Comment;
