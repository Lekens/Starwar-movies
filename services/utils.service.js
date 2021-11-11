import sql from '../models/db.js'
import { logger } from '../config/winston.js';

export const utils = {
    setUpDatabase: () => {
      const dbName = process.env.DB_NAME || 'starwars_movies_fallback';
      let query = `CREATE DATABASE IF NOT EXISTS ${dbName}`;
      sql.query(query, (err) => {
          if (err) {
              throw err;
          }
          let createTable = `CREATE TABLE IF NOT EXISTS comments (\`id\` int(11) NOT NULL auto_increment, \`comment\` TEXT(500) NOT NULL default '', \`movie_title\`  varchar(250) NOT NULL default '', PRIMARY KEY  (\`id\`))`;
              sql.query(createTable, (error) => {
                  if(error) {
                      throw error;
                  }
              });
          logger.log('info', `Connected correctly to Database => ${dbName}`);
        });
    },
    sortByReleaseDate: (movies) => {
        return movies.sort((firmA, firmB) => {
            if(new Date(firmA.release_date) < new Date(firmB.release_date)) {
                return -1;
            }
            if(new Date(firmA.release_date) > new Date(firmB.release_date)) {
                return 1;
            }
            return 0;
        });
    },
    getCommentCount: async (movie) => {
        let query = `SELECT COUNT(id) FROM comments WHERE movie_title="${movie.title}"`;
        sql.query(query, (err, count) => {
            console.log('ssss', query, count);
            if (err) {
                return 0;
            }
            return count;
        });
    },
    formatMovies: async (movies) => {
        const promises = movies.map(async (movie) => {
            const comments = await utils.getCommentCount(movie) || 0;
            return {
                name: movie.title,
                title: movie.title,
                opening_crawl: movie.opening_crawl,
                comments_count: comments,
                release_date: movie.release_date
            }
        });
        return await Promise.all(promises);
    }
}
