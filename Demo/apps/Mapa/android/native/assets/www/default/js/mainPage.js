
/* JavaScript content from js/mainPage.js in folder common */
/**
 * 
 */

currentPage = {};

currentPage.init = function(){
	WL.Logger.debug("MainPage :: init");
};

currentPage.loadPage = function(pageIndex){
	WL.Logger.debug("MainPage :: loadPage :: pageIndex: " + pageIndex);
	pagesHistory.push(path + "pages/MainPage.html");
	$("#container").load(path + "pages/Page" + pageIndex + ".html");
};
