import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Col,
  Badge,
  Row,
  CardTitle,
  Card,
  CardColumns,
  CardImg,
  CardText,
  CardSubtitle,
  CardBody,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  CardFooter,
} from 'reactstrap';
import NavBar from '../../components/navbar.component';
import axios from 'axios';
import { apiLinks } from '../../connection.config';
import '../../assets/css/blogs.scss';
import Share from '../../components/share.component';
import BlogCard from '../../components/blogcard.component';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';
import DetailBlogPage from '../../components/DetailBlogPage';
import Head from "next/head"

const getTestListData = async ()=>{
  try{
      const response = await axios.get(apiLinks.priceList, {params:{coupon:"priceList"}});
      if (response.data[0].code === 200){
          return Object.values(response.data[1]);
      }
      else{
          return [];
      }
  }
  catch(err){
      console.log(err);
  }
}

// const getCovidTestData = async () => {
//   try{
//       const covidTestsResponse = await axios.get(apiLinks.getCovidTests);
//       if(covidTestsResponse.data.code === 200){
//           return covidTestsResponse.data.data;
//       }
//       else{
//           return [];
//       }
//   }
//   catch(err){
//       console.log(err);
//   }
// }

// const getPackagesData = async () => {
//   try{
//       const packagesResponse = await axios.get(apiLinks.getPackages);
//       if(packagesResponse.data.code === 200){
//           return packagesResponse.data.data;
//       }
//       else{
//           return [];
//       }
//   }
//   catch(err){
//       console.log(err);
//   }
// }

const getBlogData = async () => {
  try {
    const result = await axios.get(apiLinks.blogData);
    if (result.status === 200) {
      return result.data.data;
    }
    else return 404;
  } catch (err) {
      return 404;
    }
};

export async function getServerSideProps(context) {
  try{
  return { props: {
            // packages: await getPackagesData(), 
            // covidTests: await getCovidTestData(),
            blogData: await getBlogData(),
            testList: await getTestListData()} 
      };
  }
  catch(err){
      console.log(err);
      return { props: {blogData: 404, testList:[]} };
  }
}

export default function Blog(props) {
  const [blogs, setBlogs] = useState([...props.blogData, ...props.blogData, ...props.blogData, ...props.blogData]);
  const [isBlogClicked, setBlogClicked] = useState(false);
  const [detailBlogData, setDetailBlogData] = useState();
  const [isVideoBlog, setVideoBlog] = useState(false);

  const catchBlogClick = (clicked, blogData, videoBlog) => {
    setBlogClicked(clicked);
    setDetailBlogData(blogData);
    setVideoBlog(videoBlog);
  };

  const CloseDetailBlogDataHandler = () => {
    setBlogClicked(false);
  };

  const filterByMedicine = () => {
    // setBlogs(props.blogData.filter(item => item.category === 'Medicine'));
    setBlogs([...props.blogData]);
  }

  const filterByHealth = () => {
    // setBlogs(props.blogData.filter(item => item.category === 'Health'));
    setBlogs([...props.blogData]);
  }

  const filterByDiseases = () => {
    // setBlogs(props.blogData.filter(item => item.category === 'Diseases'));
    setBlogs([...props.blogData]);
  }

  const filterByCovid = () => {
    console.log(blogs);
    // setBlogs(props.blogData.filter(item => item.category === 'Covid'));
    setBlogs([...props.blogData]);
  }

  const allBlogs = () => {
    setBlogs([...props.blogData, ...props.blogData, ...props.blogData, ...props.blogData]);
  }

  return (
    <>
    <Head>
        <title>Blogs || APTDiagnostics</title>
    </Head>
      <NavBar testList={props.testList} cartValue={props.cartValue} updateCartValue={props.updateCartValue}/>
      {!isBlogClicked ? (
        <Container className="mt-5">
          <Row>
            <Col lg="3" className="blog-none">
              <Row>
                <Col>
                  <Card className="category-card">
                    <CardTitle>Categories</CardTitle>
                    <CardBody>
                      <ListGroup flush>
                        <ListGroupItem onClick={filterByMedicine}>Medicines</ListGroupItem>
                        {/* <hr className="solid" /> */}
                        <ListGroupItem onClick={filterByHealth}>Health</ListGroupItem>
                        {/* <hr className="solid" /> */}
                        <ListGroupItem onClick={filterByDiseases}>Diseases</ListGroupItem>
                        {/* <hr className="solid" /> */}
                        <ListGroupItem onClick={filterByCovid}>Covid-19</ListGroupItem>
                        {/* <hr className="solid" /> */}
                        <ListGroupItem onClick={allBlogs}>All</ListGroupItem>
                      </ListGroup>
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Card className="topblogs-card">
                    <CardTitle>Top Posts</CardTitle>
                    <CardBody>
                      <ListGroup flush>
                        <ListGroupItem>
                          <ListGroupItemHeading>
                            Lorem, ipsum.
                          </ListGroupItemHeading>
                          <ListGroupItemText>
                            Maecenas sed diam eget risus varius blandit.
                          </ListGroupItemText>
                        </ListGroupItem>
                        <ListGroupItem>
                          <ListGroupItemHeading>
                            Lorem, ipsum.
                          </ListGroupItemHeading>
                          <ListGroupItemText>
                            Maecenas sed diam eget risus varius blandit.
                          </ListGroupItemText>
                        </ListGroupItem>
                        <ListGroupItem>
                          <ListGroupItemHeading>
                            Lorem, ipsum.
                          </ListGroupItemHeading>
                          <ListGroupItemText>
                            Maecenas sed diam eget risus varius blandit.
                          </ListGroupItemText>
                        </ListGroupItem>
                        <ListGroupItem>
                          <ListGroupItemHeading>
                            Lorem, ipsum.
                          </ListGroupItemHeading>
                          <ListGroupItemText>
                            Maecenas sed diam eget risus varius blandit.
                          </ListGroupItemText>
                        </ListGroupItem>
                      </ListGroup>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>

            {blogs === 404 || blogs.length === 0 ? 
              <React.Fragment>
                {toast('Blogs are not available!!')} 
              </React.Fragment> :
              <Col lg="9" className="blogcard-col" style={{justifyContent: 'center'}}>
                {blogs.map(blog => {
                  return (
                    <BlogCard
                      key={blog.blogId}
                      title={blog.heading}
                      description={blog.content}
                      isVideo={blog.isVideoBlog}
                      imageLink={blog.imagesLinks[0]}
                      videoLink={blog.videoLink}
                      catchBlogClick={catchBlogClick}
                      blogDataDetails={blog}
                    />
                  );
                })}
              </Col>
            }
          </Row>
        </Container>
      ) : (
        <DetailBlogPage {...detailBlogData} />
      )}
      <Container className="mt-4 mb-4">
        <Row className="mt-4 pb-5 mb-4"></Row>
      </Container>
    </>
  );
}
