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
// import Card from "@material-ui/core/Card"
import NavBar from './navbar.component';
import axios from 'axios';
import { apiLinks } from '../connection.config';
import '../assets/css/detailBlog.scss';
import Share from './share.component';
import BlogCard from './blogcard.component';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';
import BlogCarousel from './blogcarousel.component';
//import Carousel from './carousel.component';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Link from 'next/link'

export default function DetailBlogPage(props) {

    const [blogs,setBlogs] = useState([])

    const getOtherBlogData = async () => {
        try {
          const result = await axios.get(apiLinks.blogData);
          if (result.status === 200) {
            const rest_blogs = result.data.data.filter(blog => blog.blogId != props.blogId)
            setBlogs(rest_blogs);
          }
        } catch (err) {
          toast('Blogs are not available!!');
        }
      };
    
      useEffect(() => {
        getOtherBlogData();
      }, []);
    

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col lg="10">
            <Card className="card-content">
              <CardTitle className="card-title">{props.heading}</CardTitle>
              <CardSubtitle>
                Written by <Badge color="primary"> Team APT DIagnostics</Badge>
              </CardSubtitle>
              <CardBody>
                <Share />
                {props.isVideoBlog ? (
                  <iframe src={props.VideoLink}></iframe>
                ) : (
                  <img
                    width="85%"
                    style={{ margin: '10px' }}
                    src={props.imagesLinks[0]}
                  />
                )}
                <CardText>{props.content}</CardText>
               <Link href="/packages"> 
                    <a>Book a test now</a> 
               </Link>
              </CardBody>
            </Card>
          </Col>

          <Col lg="2">
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
      </Container>

      <Container className="mt-5">
      <Row>
          <Col lg="10">
            <div>
                <h2 style={{ textAlign: 'center' }}>Related Posts</h2>
            </div>
          </Col>
        </Row>
      </Container>

      <Container className="mt-5">
        <Row>
          <Col lg="10">
                <BlogCarousel blogs={blogs}/>
          </Col>
        </Row>
      </Container>
    </>
  );
}
