
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';



function Navbars({search,setSearch}) {

  return (
    <Navbar expand="lg"  style={{backgroundColor:"transparent"}} className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand style={{fontSize:30,fontWeight:900,padding:"10px"}}>Blogs</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav style={{fontSize:18,fontWeight:500}}>
           
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/write" >Write</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />
            
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;