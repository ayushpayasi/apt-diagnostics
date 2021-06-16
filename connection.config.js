export const apiLinks = {
    baseUrl:"http://localhost:5000/"
}

apiLinks.priceList = apiLinks.baseUrl+"priceList"
apiLinks.adminPackageList = apiLinks.baseUrl+"admin/getAllPackage"
apiLinks.adminGetPackageById = apiLinks.baseUrl+"admin/getPackageById"
apiLinks.checkAndFetchPackageDetails = apiLinks.baseUrl+"admin/dialogueBoxCheck"
apiLinks.adminPostPackage = apiLinks.baseUrl+"admin/postPackage"
apiLinks.adminTestList = apiLinks.baseUrl+"admin/getAllTests"
apiLinks.checkAndFetchTestDetails = apiLinks.baseUrl+"admin/checkAndGetTestById"
apiLinks.adminPostTest = apiLinks.baseUrl+"admin/postTest"
apiLinks.adminBlogList = apiLinks.baseUrl+"admin/getAllBlogs"
apiLinks.checkAndFetchBlogDetails = apiLinks.baseUrl+"admin/checkAndGetBlogById"
apiLinks.adminPostBlog = apiLinks.baseUrl+"admin/postBlog"
