pageNotFound = (request, response, next) => {
    response.status(404).render('404', { pageTitle: '404', path:'' });
};

module.exports = {
    pageNotFound: pageNotFound
}