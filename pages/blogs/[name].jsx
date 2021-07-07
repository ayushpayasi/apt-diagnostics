// import React,{useEffect,useState} from 'react'
// import NavBar from "../../components/navbar.component"
// import {Container,Col,Row,CardTitle,Card,CardColumns,CardImg,CardText,CardSubtitle,CardBody,ListGroup,ListGroupItem,ListGroupItemHeading,ListGroupItemText, CardFooter} from "reactstrap"
// import axios from 'axios';
// import {apiLinks} from "../../connection.config"

// export default function latest_blogs() {
   
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [postsPerPage] = useState(10);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       setLoading(true);
//       const res = await axios.get(apiLinks.blogData);
//       setBlogs(res.data);
//       setLoading(false);
//     };

//     fetchBlogs();
//   }, []);

// //   // Get current posts
// //   const indexOfLastPost = currentPage * postsPerPage;
// //   const indexOfFirstPost = indexOfLastPost - postsPerPage;
// //   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

// //   // Change page
// //   const paginate = pageNumber => setCurrentPage(pageNumber);
    

//     return (
//         <>
//         <NavBar/>
//         <Container className="mt-5">
//                 <Card className="blog-card">
//                         <CardImg top width="100%" src="/images/bgcheck.jpg"></CardImg>
//                         <CardSubtitle>13-05-2019 @ayushPayasi</CardSubtitle>
//                         <CardTitle>Lorem ipsum dolor sit amet consectetur.</CardTitle>
//                         <Share/> 
//                         <CardText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde reprehenderit assumenda voluptatem recusandae autem id aspernatur, commodi eligendi saepe natus!</CardText>
//                 </Card>
//         </Container>
//         </>

//     )
// }
