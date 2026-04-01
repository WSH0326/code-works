function http({
  url,
  method = "GET",
  data = {}
}) {
  return new Promise((resolve, reject) => {
    let baseURL = "http://60.205.2.196:8083"
    let cookie = "";
    if (wx.getStorageSync('token')) {
      cookie = "Authorization=" + wx.getStorageSync('token')
    }
    wx.request({
      url: baseURL + url,
      method: method,
      data: data,
      header: {
        "content-type": "application/x-www-form-urlencoded",
        cookie: cookie
      },
      success: res => {
        if (res.data.code === 200) {
          resolve(res.data)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "error"
          })
          reject(res.data)
        }
      },
      fail: err => {
        wx.showToast({
          title: err.errMsg,
          icon: "error"
        })
        reject(err)
      }
    })
  })
}

export default http