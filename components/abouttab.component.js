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
      <Nav className="mt-5">
        <NavItem>
          <NavLink
            className={classnames({ activ: activeTab === '1' }, 'tab-nav')}
            onClick={() => {
              toggle('1');
            }}
          >
            Who We Are
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ activ: activeTab === '2' }, 'tab-nav')}
            onClick={() => {
              toggle('2');
            }}
          >
            What Do We Offer
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ activ: activeTab === '3' }, 'tab-nav')}
            onClick={() => {
              toggle('3');
            }}
          >
            Services
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ activ: activeTab === '4' }, 'tab-nav')}
            onClick={() => {
              toggle('4');
            }}
          >
            CSR
          </NavLink>
        </NavItem>
        {/* <NavItem>
          <NavLink
            className={classnames({ activ: activeTab === '5' }, 'tab-nav')}
            onClick={() => {
              toggle('5');
            }}
          >
            CSR
          </NavLink>
        </NavItem> */}
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
                  <p className="tab-body">
                  APT Diagnostics is a socially conscious line of diagnostic services which intends to create a niche for
itself, leveraging a consumer centric foundation, in-house industry leading testing infrastructure and
above-board quality standards.
                  </p>
                  <p className="tab-body">
                  Lead by a team of experts with experience spanning across 10 years in the pathology sector, APT
Diagnostics’ point of emphasis is to create health awareness and cater to all sects of the society with its
affordable and superior testing services.
                  </p>
                  <p className="tab-body">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis ipsam quas molestias Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Voluptate, modi dicta
                    veritatis ullam tempora eveniet perferendis fugit soluta hic
                    totam consectetur deleniti atque dolore unde omnis sint
                    placeat voluptatibus esse eius magnam! Atque similique iste
                    minima quod perspiciatis voluptatibus eveniet. unde
                    accusantium! Beatae illum sapiente sequi error inventore!
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
            <Col md="12" lg="6" className="mt-3">
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
        <TabPane tabId="2">
          <Row className="mt-5">
            <Col>
              <h4 className="tab-heading">What Do We Offer!</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* <h5 style={{ color: 'grey' }}>Management Team</h5> */}
              <p>
              APT Diagnostics offers a wide array of testing services ranging from regular routine check ups to
specialized diagnostics. Besides delivering accurate reports, APT Diagnostics offers value to the
customer experience through streamlined appointment scheduling, easy home collections and timely
delivery. With an increased focus on home collection network, APT Diagnostics offers minimal waiting
periods for all your testing requirements at the comfort of your homes.
              </p>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <ProfileCarousel />
            </Col>
          </Row>
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
          <Row className="mt-5">
            <Col>
              <h4 className="tab-heading">Services</h4>
            </Col>
          </Row>
          <Row>
            <Col lg="6" md="12">
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
            <Col lg="6" md="12" className="align-center-column">
              <img
                style={{ height: '250px', width: '100%', borderRadius: '5px' }}
                src="/images/carouselImgz.jpg"
              ></img>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <h5>Hematology Services</h5>
            </Col>
          </Row>
          <Row>
            <Col lg="4" md="6" sm="8" xs="10">
              <img
                style={{ height: '150px', width: '80%', borderRadius: '5px' }}
                src="/images/doctor-patient1.jpg"
              ></img>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <p className="tab-body">
              Hematology specializes in diseases of the blood and blood components.
              These include blood and bone marrow cells. Hematological tests can help diagnose anemia,
              infection, hemophilia, blood-clotting disorders, and leukemia.
              </p>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <h5> Biochemistry Services</h5>
            </Col>
          </Row>
          <Row>
            <Col lg="4" md="6" sm="8" xs="10">
              <img
                style={{ height: '150px', width: '80%', borderRadius: '5px' }}
                src="/images/doctor-patient2.jpg"
              ></img>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <p className="tab-body">
              Clinical Biochemistry deals with the measurement of chemicals (both
natural and unnatural) in blood, urine and other body fluids. These test results are useful for
detecting health problems, determining prognosis and guiding the therapy of a patient.
              </p>
              {/* <p className="tab-body">
                Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. Voluptas deserunt ut delectus est
                similique perferendis aliquid quis? Quasi, maiores. Sunt.
                consectetur adipisicing elit. Blanditiis ipsam quas molestias
                unde accusantium! Beatae illum sapiente sequi error inventore!
              </p>
              <p className="tab-body">
                Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. Voluptas deserunt ut delectus est
                similique perferendis aliquid quis? Quasi, maiores. Sunt.
                consectetur adipisicing elit. Blanditiis ipsam quas molestias
                unde accusantium! Beatae illum sapiente sequi error inventore!
              </p> */}
            </Col>
          </Row>
        </TabPane>
        {/* <TabPane tabId="4">
          <Row className="mt-5">
            <Col>
              <h4 className="tab-heading">Quality Assurance</h4>
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
        */}
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
