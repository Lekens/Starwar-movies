import eachAsync from 'each-async';
import sql from '../models/db.js'
import { logger } from '../config/winston.js';
import Comment from '../models/comment.model.js';
export const utils = {
    setUpDatabase: () => {
      const dbName = process.env.DB_NAME || 'starwars_movies_fallback';
      let query = `CREATE DATABASE IF NOT EXISTS ${dbName}`;
      sql.query(query, (err) => {
          if (err) {
              throw err;
          }
          let createTable = `CREATE TABLE IF NOT EXISTS comments (\`id\` int(11) NOT NULL auto_increment, \`comment\` TEXT(500) NOT NULL default '', \`movie_title\` varchar(250) NOT NULL default '', \`commenter_ip\`  varchar(250) NOT NULL default '', \`date\` datetime NULL, PRIMARY KEY  (\`id\`))`;
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
    listComments: (title, callback) => {
        Comment.getAll(title, callback);
    },
    getCommentCount: async (movie) => {
        await Comment.countComment(movie);
    },
    addMetaDataToCharacters: (characters) => {
        let totalHeight = 0;
        characters.forEach(character => {
            totalHeight += parseFloat(character.height) || 0;
        });
        return {
            data: characters,
            metadata: {
                total: characters.length,
                totalHeightCm: `${totalHeight}cm`,
                totalHeightFeet: `${(totalHeight / 30.48).toFixed(2)}ft`,
                totalHeightInches: `${(totalHeight / 2.54).toFixed(2)}inches`,
            }
        }
    },
    formatMovies: (movies, cb) => {
        /*const promises = movies.forEach((movie) => {
            const comments = utils.getCommentCount(movie);
            return {
                name: movie.title,
                title: movie.title,
                opening_crawl: movie.opening_crawl,
                comments_count: comments,
                release_date: movie.release_date
            }
        });
        return await Promise.all(promises);*/
        try {
            const updatedMovies = [];
            eachAsync(movies, (movie, index, done) => {
                let query = `SELECT COUNT(id) as count FROM comments WHERE movie_title="${movie.title}"`;
                sql.query(query, (err, count) => {
                    if (err) {
                        updatedMovies.push({
                            name: movie.title,
                            title: movie.title,
                            opening_crawl: movie.opening_crawl,
                            comments_count: 0,
                            release_date: movie.release_date
                        });
                        done();
                    }
                    updatedMovies.push({
                        name: movie.title,
                        title: movie.title,
                        opening_crawl: movie.opening_crawl,
                        comments_count: JSON.parse(JSON.stringify(count))[0].count,
                        release_date: movie.release_date
                    });
                    done();
                });

            }, () => {
                cb(updatedMovies);
            });
        } catch (e) {
            console.log('error', e);
        }
    },
    filterCharacters: (characters, filter) => {
        if(!filter) {
            return characters;
        }
        return characters.filter(character => character.gender?.toLowerCase() === filter.toLowerCase());
    },
    useSortByCharacters: (characters, sort) => {
        if(!sort.order) {
            return characters;
        } else {
            console.log('sort.sortBy.toLowerCase()', sort.sortBy.toLowerCase());
            switch (sort.sortBy.toLowerCase()) {
                case 'name': {
                    return characters.sort((characterA, characterB) => {
                        const orderCap = sort.order.toUpperCase();
                        if(characterA.name < characterB.name) {
                            return orderCap.includes('ASC') ? -1 : 1;
                        }
                        if(characterA.name > characterB.name) {
                            return orderCap.includes('ASC') ? 1 : -1;
                        }
                        return 0;
                    });
                }
                case 'gender': {
                    return characters.sort((characterA, characterB) => {
                        const orderCap = sort.order.toUpperCase();
                        if(characterA.gender < characterB.gender) {
                            return orderCap.includes('ASC') ? -1 : 1;
                        }
                        if(characterA.gender > characterB.gender) {
                            return orderCap.includes('ASC') ? 1 : -1;
                        }
                        return 0;
                    });
                }
                case 'height': {
                    return characters.sort((characterA, characterB) => {
                        const orderCap = sort.order.toUpperCase();
                        if(parseFloat(characterA.height) < parseFloat(characterB.height)) {
                            return orderCap.includes('ASC') ? -1 : 1;
                        }
                        if(parseFloat(characterA.height) > parseFloat(characterB.height)) {
                            return orderCap.includes('ASC') ? 1 : -1;
                        }
                        return 0;
                    });
                }
                default: {
                    return characters;
                }
            }
        }
    }
}
