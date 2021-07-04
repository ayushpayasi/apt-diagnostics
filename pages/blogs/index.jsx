import React,{useState,useEffect} from 'react'
import {Container,Col,Row,CardTitle,Card,CardColumns,CardImg,CardText,CardSubtitle,CardBody,ListGroup,ListGroupItem,ListGroupItemHeading,ListGroupItemText, CardFooter} from "reactstrap"
// import Card from "@material-ui/core/Card"
import NavBar from "../../components/navbar.component"
import axios from 'axios'
import { apiLinks } from '../../connection.config'
import "../../assets/css/blogs.scss"
import Share from "../../components/share.component"

export default function Blog() {

    const [blogs, setBlogs] = useState([{content:""}]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage,setPostsPerPage] = useState(10);
    const [content,setContent] = useState([])


    useEffect(() => {
        const fetchBlogs = async () => {
        setLoading(true);
        const res = await axios.get(apiLinks.blogData);
        console.log(res.data.data)
        setBlogs(res.data.data);
        setLoading(false);
        };

        fetchBlogs();
    }, []);
    
    const cardFiller = (details)=>{
        return(
                <Card className="blog-card">
                    <CardImg top width="100%" src="/images/bgcheck.jpg"></CardImg>
                    <CardSubtitle>{details.content}</CardSubtitle>
                    <CardTitle>Lorem ipsum dolor sit amet consectetur.</CardTitle>
                    <Share/> 
                    <CardText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde reprehenderit assumenda voluptatem recusandae autem id aspernatur, commodi eligendi saepe natus!</CardText>
                </Card>
                // <Card className="blog-card">
                //     <CardImg top width="100%" src="/images/bgcheck.jpg"></CardImg>
                //     <CardSubtitle>13-05-2019 @ayushPayasi</CardSubtitle>
                //     <CardTitle>Lorem ipsum dolor sit amet consectetur.</CardTitle>
                //     <Share/> 
                //     <CardText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde reprehenderit assumenda voluptatem recusandae autem id aspernatur, commodi eligendi saepe natus!</CardText>
                // </Card>
        )
    }

    //console.log(blogs.length)

    return (
        <>
            <NavBar/>
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
                    <Col lg="9" className="blogcard-col">
                       
                            
                        {blogs.map(x => {cardFiller(x)})}
                           
           

                       {/* <Row>
                           {cardFiller()}
                           {cardFiller()}
                           {cardFiller()}       
                       </Row> */}
                        {/* <Card className="blog-card">
                            <CardImg top width="100%" src="/images/bgcheck.jpg"></CardImg>
                            <CardSubtitle>13-05-2019 @ayushPayasi</CardSubtitle>
                            <CardTitle>Lorem ipsum dolor sit amet consectetur.</CardTitle>
                            <Share/> 
                            <CardText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde reprehenderit assumenda voluptatem recusandae autem id aspernatur, commodi eligendi saepe natus!</CardText>
                        </Card>
                        <Card className="blog-card">
                            <CardImg top width="100%" src="/images/bgcheck.jpg"></CardImg>
                            <CardSubtitle>Lorem ipsum dolor sit.</CardSubtitle>
                            <CardTitle>Lorem ipsum dolor sit amet consectetur.</CardTitle>
                            <Share/> 
                            <CardText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde reprehenderit assumenda voluptatem recusandae autem id aspernatur, commodi eligendi saepe natus!</CardText>
                        </Card>
                        <Card className="blog-card">
                            <CardImg top width="100%" src="/images/bgcheck.jpg"></CardImg>
                            <CardSubtitle>Lorem ipsum dolor sit.</CardSubtitle>
                            <CardTitle>Lorem ipsum dolor sit amet consectetur.</CardTitle>
                            <Share/> 
                            <CardText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde reprehenderit assumenda voluptatem recusandae autem id aspernatur, commodi eligendi saepe natus!</CardText>
                        </Card>
                        <Card className="blog-card">
                            <CardImg top width="100%" src="/images/bgcheck.jpg"></CardImg>
                            <CardSubtitle>Lorem ipsum dolor sit.</CardSubtitle>
                            <CardTitle>Lorem ipsum dolor sit amet consectetur.</CardTitle>
                            <Share/> 
                            <CardText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde reprehenderit assumenda voluptatem recusandae autem id aspernatur, commodi eligendi saepe natus!</CardText>
                        </Card> */}
                    </Col>
                </Row>
            </Container>
        </>
    )
}
