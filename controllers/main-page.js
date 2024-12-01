const mainPage = async (req, res) => {
  try {
    res.render('main-page/index.ejs')
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  mainPage
}
