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
        Comment.countComment(movie);
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
