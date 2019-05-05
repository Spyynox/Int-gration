import Mustache from 'mustache';

var id = 1 
                    var parser = new DOMParser();
                    // var doc = parser.parseFromString(stringContainingHTMLSource, "text/html");
                    var true_message = `<ul><li id="{{nickname}}">"{{nickname}}"</li><br><li>"{{message}}"</li><br></ul>`
                    true_message = parser.parseFromString(Mustache.render {
                        id: nickname,
                        true_message: message,
                        nickname: nickname
                    })