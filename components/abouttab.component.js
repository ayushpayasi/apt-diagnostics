import React, { useState } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from 'reactstrap';
import classnames from 'classnames';
import Dna from '../components/dna.component';
import ProfileCarousel from '../components/profilecarousel.component';

const Tab = props => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  //   return(
  //       <ProfileCarousel/>
  //   )

  return (
    <div>
      <Nav className="mt-4">
        <NavItem>
          <NavLink
            className={classnames({ activ: activeTab === '1' }, 'tab-nav pt-2')}
            onClick={() => {
              toggle('1');
            }}
          >
            Who We Are
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ activ: activeTab === '2' }, 'tab-nav pt-2')}
            onClick={() => {
              toggle('2');
            }}
          >
            What Do We Offer
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ activ: activeTab === '3' }, 'tab-nav pt-2')}
            onClick={() => {
              toggle('3');
            }}
          >
            Services
          </NavLink>
        </NavItem>
        {/* <NavItem>
          <NavLink
            className={classnames({ activ: activeTab === '4' }, 'tab-nav')}
            onClick={() => {
              toggle('4');
            }}
          >
            CSR
          </NavLink>
        </NavItem>
       */}
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col className="mt-5">
              <Row>
                <Col>
                  <h4 className="tab-heading">Who We Are</h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className="tab-body" style={{fontSize: '1.1rem'}}>
                  APT Diagnostics is a socially conscious line of diagnostic services which intends to create a niche for
itself, leveraging a consumer centric foundation, in-house industry leading testing infrastructure and
above-board quality standards.
                  </p>
                  <p className="tab-body" style={{fontSize: '1.1rem'}}>
                  Lead by a team of experts with experience spanning across 10 years in the pathology sector, APT
Diagnostics’ point of emphasis is to create health awareness and cater to all sects of the society with its
affordable and superior testing services.
                  </p>
                  <p className="tab-body" style={{fontSize: '1.1rem'}}>
                  APT Diagnostics is a socially conscious line of diagnostic services which intends to create a niche for
itself, leveraging a consumer centric foundation, in-house industry leading testing infrastructure and
above-board quality standards.Lead by a team of experts with experience spanning across 10 years in the pathology sector, APT
Diagnostics’ point of emphasis is to create health awareness and cater to all sects of the society with its
affordable and superior testing services.
                  </p>
                </Col>
              </Row>
            </Col>
            <Col className="align-center-end none">
              <Dna />
            </Col>
          </Row>
          <Row>
            <Col md="12" lg="6">
              <Row className="mt-5 mb-5">
                <Col className="align-center-column">
                  <img
                    className="home-collection-icon"
                    alt="img1"
                    style={{ height: '70px', width: '70px' }}
                    src="/svg/aptIcons/light/home_collection.svg"
                  />
                  <h4 className="about-img-heading text-center">
                    5+<span>Test Centers</span>
                  </h4>
                </Col>
                <Col className="align-center-column ">
                  <img
                    className="test-included-icon"
                    alt="img2"
                    style={{ height: '70px', width: '70px' }}
                    src="/svg/aptIcons/light/tests_included.svg"
                  />
                  <h4 className="about-img-heading text-center">
                    2+<span>Laboratories</span>
                  </h4>
                </Col>
              </Row>
              <Row className="mt-5 mb-5">
                <Col className="align-center-column">
                  <img
                    className="test-included-icon"
                    alt="img2"
                    style={{ height: '70px', width: '70px' }}
                    src="/svg/aptIcons/light/tests_included.svg"
                  />
                  <h4 className="about-img-heading text-center">
                    2+<span>Laboratories</span>
                  </h4>
                </Col>
                <Col className="align-center-column">
                  <img
                    className="home-collection-icon"
                    alt="img1"
                    style={{ height: '70px', width: '70px' }}
                    src="/svg/aptIcons/light/home_collection.svg"
                  />
                  <h4 className="about-img-heading text-center">
                    5+<span>Test Centers</span>
                  </h4>
                </Col>
              </Row>
            </Col>
            <Col md="12" lg="6" className="mt-3 mb-5">
              <p className="tab-body" style={{fontSize: '1.1rem'}}>
              Inception of APT Diagnostics is primarily attributed to the recent collapse in the health care, path labs and diagnostics sphere which we all witnessed in the wake of covid-19. With a vision to change the way consumers experience the testing services, founders of APT Diagnostics have come up with an innovative setup to mitigate the hassles, long queues and mediocre reports through a perfect amalgamation of technical expertise and management exposure.
              </p>
              <p className="tab-body" style={{fontSize: '1.1rem'}}>
              We at APT Diagnostics strive to become a name that will be synonymous to quality and experience, never loosing sight of what pain points need to be addressed for providing a consistent hassle-free experience to the people availing the services. To achieve this, our team will work closely with the customer’s voice through extensive feedback incorporation and effective grievance redressal mechanisms.
              </p>
            </Col>
          </Row>
          <Row className="mt-5"></Row>
        </TabPane>
        <TabPane tabId="2">
          <Row className="mt-5">
            <Col>
              <h4 className="tab-heading">What Do We Offer!</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* <h5 style={{ color: 'grey' }}>Management Team</h5> */}
              <p style={{fontSize: '1.1rem'}}>
              APT Diagnostics offers a wide array of testing services ranging from regular routine check ups to
specialized diagnostics. Besides delivering accurate reports, APT Diagnostics offers value to the
customer experience through streamlined appointment scheduling, easy home collections and timely
delivery. With an increased focus on home collection network, APT Diagnostics offers minimal waiting
periods for all your testing requirements at the comfort of your homes.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* <h5 style={{ color: 'grey' }}>Management Team</h5> */}
              <p style={{fontSize: '1.1rem'}}>
              There’s a reason why APT Diagnostics should be your choice to go to when it comes to pathology tests. In an era of fast paced lifestyle, what everyone needs is a hassle free, timely and convenient experience. What we offer along with accurate reports is peace of mind and the feeling that you are genuinely cared for.
              </p>
            </Col>
          </Row>
          <Row className="mt-3 mb-5">
            <Col>
              <ProfileCarousel />
            </Col>
          </Row>
          <Row className='mt-5 mb-5'></Row>
          {/* <Row className="mt-3">
            <Col>
              <ProfileCarousel />
            </Col>
          </Row> */}
          {/* <Row className="mt-5">
            <Col>
              <h5 style={{ color: 'grey' }}>Our Doctors</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                aspernatur debitis quia hic exercitationem rerum repellendus
                ducimus dolor perspiciatis quidem?
              </p>
            </Col>
          </Row> */}
          {/* <Row className="mt-3">
            <Col>
              <ProfileCarousel />
            </Col>
          </Row> */}
        </TabPane>
        <TabPane tabId="3">
          <Row className="mt-4 mb-2">
            <Col>
              <h4 className="tab-heading">Services</h4>
            </Col>
          </Row>
          <Row className="service-box-realign-big">
            <Col lg="6" md="12" className="about-page-service-image-container" style={{flexDirection: 'column'}}>
              <p className="tab-body">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis ipsam quas molestias unde accusantium! Beatae illum
                sapiente sequi error inventore!
              </p>
              <p className="tab-body">
                Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. Voluptas deserunt ut delectus est
                similique perferendis aliquid quis? Quasi, maiores. Sunt.
                consectetur adipisicing elit. Blanditiis ipsam quas molestias
                unde accusantium! Beatae illum sapiente sequi error inventore!
              </p>
              <p className="tab-body">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis ipsam quas molestias Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Voluptate, modi dicta veritatis
                ullam tempora eveniet perferendis fugit soluta hic totam
                consectetur deleniti atque dolore unde omnis sint placeat
                voluptatibus esse eius magnam! Atque similique iste minima quod
                perspiciatis voluptatibus eveniet. unde accusantium! Beatae
                illum sapiente sequi error inventore!
              </p>
            </Col>
            <Col lg="6" md="12" className="resize-image-on-tablet align-center-column"
              style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5px' }}
            >
              <img
                style={{ height: '250px', width: '100%', borderRadius: '5px', boxShadow: '2px 2px 5px #000' }}
                src="/images/carouselImgz.jpg"
              ></img>
            </Col>
          </Row>
          <Row className="service-box-realign-small">
            <Col lg="6" md="12" className="resize-image-on-tablet align-center-column mb-3"
              style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5px' }}
            >
              <img
                style={{ height: '250px', width: '100%', borderRadius: '5px', boxShadow: '2px 2px 5px #000'}}
                src="/images/carouselImgz.jpg"
              ></img>
            </Col>
            <Col lg="6" md="12" className="about-page-service-image-container" style={{flexDirection: 'column'}}>
              <p className="tab-body">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis ipsam quas molestias unde accusantium! Beatae illum
                sapiente sequi error inventore!
              </p>
              <p className="tab-body">
                Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. Voluptas deserunt ut delectus est
                similique perferendis aliquid quis? Quasi, maiores. Sunt.
                consectetur adipisicing elit. Blanditiis ipsam quas molestias
                unde accusantium! Beatae illum sapiente sequi error inventore!
              </p>
              <p className="tab-body">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis ipsam quas molestias Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Voluptate, modi dicta veritatis
                ullam tempora eveniet perferendis fugit soluta hic totam
                consectetur deleniti atque dolore unde omnis sint placeat
                voluptatibus esse eius magnam! Atque similique iste minima quod
                perspiciatis voluptatibus eveniet. unde accusantium! Beatae
                illum sapiente sequi error inventore!
              </p>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <h3 style={{textAlign: 'center', color: '#0a4275'}}>Hematology Services</h3>
            </Col>
          </Row>
          <Row>
            <Col lg="6" md="5" sm="12" xs="12" className="mt-3 about-page-service-image-container"
            >
              <img
                className="about-page-images"
                src="/images/doctor-patient1.jpg"
              ></img>
            </Col>
            <Col lg="6" md="7" sm="12" xs="12" className="mt-3 about-page-service-image-container">
              <p className="tab-body">
              Hematology Services - Hematology is the specialty responsible for the diagnosis and management of a wide range of benign and malignant disorders of the red and white blood cells, platelets and the coagulation system in adults and children. Hematology specializes in diseases of the blood and blood components. These include blood and bone marrow cells. Hematological tests can help diagnose anemia, infection, hemophilia, blood-clotting disorders, and leukemia. With industry leading equipment and highly trained staff, we offer the best-in-class hematology services so you and your loved ones get the most out of the time and money spent.
              </p>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <h3 style={{textAlign: 'center', color: '#0a4275'}}> Biochemistry Services</h3>
            </Col>
          </Row>
          <Row className="service-box-realign-big">
            <Col lg="6" md="7" sm="12" xs="12" className="mt-3 about-page-service-image-container">
              <p className="tab-body">
              Clinical Biochemistry deals with the measurement of chemicals (both natural and unnatural) in blood, urine and other body fluids. These test results are useful for detecting health problems, determining prognosis and guiding the therapy of a patient. Our industry leading analyzers and trained professionals ensure a hassle-free experience, precise results and timely reports.
              </p>
            </Col>
            <Col lg="6" md="5" sm="12" xs="12" className="mt-3 about-page-service-image-container"
            >
              <img
                className="about-page-images"
                src="/images/doctor-patient2.jpg"
              ></img>
            </Col>
          </Row>
          <Row className="service-box-realign-small">
            <Col lg="6" md="5" sm="12" xs="12" className="mt-3 about-page-service-image-container"
            >
              <img
                className="about-page-images"
                src="/images/doctor-patient2.jpg"
              ></img>
            </Col>
            <Col lg="6" md="7" sm="12" xs="12" className="mt-3 about-page-service-image-container">
              <p className="tab-body">
              Clinical Biochemistry deals with the measurement of chemicals (both natural and unnatural) in blood, urine and other body fluids. These test results are useful for detecting health problems, determining prognosis and guiding the therapy of a patient. Our industry leading analyzers and trained professionals ensure a hassle-free experience, precise results and timely reports.
              </p>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <h3 style={{textAlign: 'center', color: '#0a4275'}}> Immunoassay Services</h3>
            </Col>
          </Row>
          <Row>
            <Col lg="6" md="5" sm="12" xs="12" className="mt-3 about-page-service-image-container"
            >
              <img
                className="about-page-images"
                src="/images/doctor-patient2.jpg"
              ></img>
            </Col>
            <Col lg="6" md="7" sm="12" xs="12" className="mt-3 about-page-service-image-container">
              <p className="tab-body">
              Immunoassays can be used to test for the presence of a specific antibody or a specific antigen in blood or other fluids. When immunoassays are used to test for the presence of an antibody in a blood or fluid sample, the test contains the specific antigen as part of the detection system. Get yourself tested with our advanced analyzers and specialized Immunoassay services.
              </p>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <h3 style={{textAlign: 'center', color: '#0a4275'}}> Molecular Biology</h3>
            </Col>
          </Row>
          <Row className="service-box-realign-big">
            <Col lg="6" md="7" sm="12" xs="12" className="mt-3 about-page-service-image-container">
              <p className="tab-body">
              RT PCR based testing of infectious diseases as well as specialized oncology markers. For determining the tendency to develop a disease and gauging the efficacy of the potential treatments available, Molecular biology plays a crucial role through the determination of the genetic variants of a patient. With its state-of-the-art instrumentation, APT Diagnostics offers RT-PCR bases testing of infectious diseases as well as specialized oncology markers.
              </p>
            </Col>
            <Col lg="6" md="5" sm="12" xs="12" 
              className="mt-3 about-page-service-image-container" 
            >
              <img
                className="about-page-images"
                src="/images/doctor-patient2.jpg"
              ></img>
            </Col>
          </Row>
          <Row className="service-box-realign-small">
            <Col lg="6" md="5" sm="12" xs="12" 
              className="mt-3 about-page-service-image-container" 
            >
              <img
                className="about-page-images"
                src="/images/doctor-patient2.jpg"
              ></img>
            </Col>
            <Col lg="6" md="7" sm="12" xs="12" className="mt-3 about-page-service-image-container">
              <p className="tab-body">
              RT PCR based testing of infectious diseases as well as specialized oncology markers. For determining the tendency to develop a disease and gauging the efficacy of the potential treatments available, Molecular biology plays a crucial role through the determination of the genetic variants of a patient. With its state-of-the-art instrumentation, APT Diagnostics offers RT-PCR bases testing of infectious diseases as well as specialized oncology markers.
              </p>
            </Col>
          </Row>
          <Row className="mt-5 mb-5"></Row>
        </TabPane>

        <TabPane tabId="4">
          <Row className="mt-5">
            <Col>
              <h4 className="tab-heading">CSR</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="tab-body">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis ipsam quas molestias unde accusantium! Beatae illum
                sapiente sequi error inventore!
              </p>
              <p className="tab-body">
                Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. Voluptas deserunt ut delectus est
                similique perferendis aliquid quis? Quasi, maiores. Sunt.
                consectetur adipisicing elit. Blanditiis ipsam quas molestias
                unde accusantium! Beatae illum sapiente sequi error inventore!
              </p>
              <p className="tab-body">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis ipsam quas molestias Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Voluptate, modi dicta veritatis
                ullam tempora eveniet perferendis fugit soluta hic totam
                consectetur deleniti atque dolore unde omnis sint placeat
                voluptatibus esse eius magnam! Atque similique iste minima quod
                perspiciatis voluptatibus eveniet. unde accusantium! Beatae
                illum sapiente sequi error inventore!
              </p>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Tab;
