import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Container,Badge,Button,Col,Row,CardTitle,Card,CardColumns,CardImg,CardText,CardSubtitle,CardBody,ListGroup,ListGroupItem,ListGroupItemHeading,ListGroupItemText, CardFooter} from "reactstrap"
// import Card from "@material-ui/core/Card"
import NavBar from "../../components/navbar.component"
import "../../assets/css/blogs.scss"
import Share from "../../components/share.component"
import BlogCard from "../../components/blogcard.component"
import { toast } from 'react-toastify'
import {apiLinks} from "../../connection.config"

export default function Blog() {

    const [blogData, setBlogData] = useState(null)
    const [blogClick, setBlogClick] = useState(false)
    const [detailBlogData, setDetailBlogData] = useState()

    const catchBlogClick = (clicked, data) => {
        setBlogClick(clicked)
        setDetailBlogData(data)
    }

    const getBlogData = async () => {
        try {
            const getblogData = await axios.get(apiLinks.blog)
            console.log(getblogData.data.data)
            if(getblogData.status === 200) {
                setBlogData(getblogData.data.data)
            }
        }
        catch (err) {
            toast("Blogs are currently not available")
        }
    }

    const CloseDetailBlogDataHandler = () => {
        setBlogClick(false)
    }
    const DetailBlogData = () => {
        return (
            <Col lg="9">
                <Card>
                    <CardImg top width="100%" src="/images/bgcheck.jpg"></CardImg>
                    <CardSubtitle>Written by <Badge color="primary"> Team APT DIagnostics</Badge></CardSubtitle>
                    <CardTitle style={{cursor : 'pointer'}}>{detailBlogData.heading}</CardTitle>
                    <Share/> 
                    <CardText>{detailBlogData.content}</CardText>
                    <Button onClick={CloseDetailBlogDataHandler} color="primary" size="sm">All Blogs!</Button>
                </Card>
            </Col>
        )
    }

    useEffect(() => {
        getBlogData();
    }, [])

    return (
        <>
            <NavBar/>
            {blogData ? 
            <Container className="mt-5">
            <Row>
                <Col lg="3" className="blog-none">
                    <Row>
                        <Col>
                            <Card className="category-card">
                                <CardTitle>
                                    Categories
                                </CardTitle>
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
                          {/* filter out top posts and render only 4 of them */}
                            <Card className="topblogs-card">
                                <CardTitle>
                                    Top Posts
                                </CardTitle>
                                <CardBody>
                                    <ListGroup flush>
                                        <ListGroupItem>
                                        <ListGroupItemHeading>Lorem, ipsum.</ListGroupItemHeading>
                                        <ListGroupItemText>
                                        Maecenas sed diam eget risus varius blandit.
                                        </ListGroupItemText>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                        <ListGroupItemHeading>Lorem, ipsum.</ListGroupItemHeading>
                                        <ListGroupItemText>
                                        Maecenas sed diam eget risus varius blandit.
                                        </ListGroupItemText>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                        <ListGroupItemHeading>Lorem, ipsum.</ListGroupItemHeading>
                                        <ListGroupItemText>
                                        Maecenas sed diam eget risus varius blandit.
                                        </ListGroupItemText>
                                        </ListGroupItem>
                                        <ListGroupItem>
                                        <ListGroupItemHeading>Lorem, ipsum.</ListGroupItemHeading>
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
                { !blogClick ? 
                <Col lg="9" className="blogcard-col">
                    {blogData.map(curBlog => {
                       return <BlogCard key={curBlog.blogId} title={curBlog.heading} description={curBlog.content} catchBlogClick={catchBlogClick} blogDataDetails={curBlog}></BlogCard>
                    })}
                </Col>
                :
                <DetailBlogData></DetailBlogData>
                }
            </Row>
        </Container> 
        : 
        <Container>
            <Badge color="danger">No Blogs Found!!!!</Badge>
        </Container>}
            
        </>
    )
}
