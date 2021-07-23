import React, { useState, useEffect } from 'react';
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

export default function Blog(props) {
  const [blogs, setBlogs] = useState([]);
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

  //   const detailBlogPage = () => {
  //     return (
  //       <>
  //         <Col lg="9">
  //             <Card>
  //                {isVideoBlog ? <CardImg top width="100%" src="/images/bacteria.png"></CardImg> : <CardImg top width="100%" src="/images/bgcheck.jpg"></CardImg> }
  //                 <CardSubtitle>Written by <Badge color="primary"> Team APT DIagnostics</Badge></CardSubtitle>
  //                 <CardTitle style={{cursor : 'pointer'}}>{detailBlogData.heading}</CardTitle>
  //                 <Share/>
  //                 <CardText>{detailBlogData.content}</CardText>
  //                 <Button onClick={CloseDetailBlogDataHandler} color="primary" size="sm">All Blogs!</Button>
  //             </Card>
  //         </Col>
  //         <Col>
  //           Related Posts
  //         </Col>
  //       </>
  //     )
  // }

  const getBlogData = async () => {
    try {
      const result = await axios.get(apiLinks.blogData);
      if (result.status === 200) {
        setBlogs(result.data.data);
      }
    } catch (err) {
      toast('Blogs are not available!!');
    }
  };

  useEffect(() => {
    getBlogData();
  }, []);

  return (
    <>
      <NavBar cartValue={props.cartValue} updateCartValue={props.updateCartValue}/>
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
                        <ListGroupItem>Medicines</ListGroupItem>
                        {/* <hr className="solid" /> */}
                        <ListGroupItem>Health</ListGroupItem>
                        {/* <hr className="solid" /> */}
                        <ListGroupItem>Diseases</ListGroupItem>
                        {/* <hr className="solid" /> */}
                        <ListGroupItem>Covid-19</ListGroupItem>
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

            <Col lg="9" className="blogcard-col">
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
          </Row>
        </Container>
      ) : (
        <DetailBlogPage {...detailBlogData} />
      )}
    </>
  );
}
