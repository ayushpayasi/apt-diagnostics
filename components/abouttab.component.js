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
            About us
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ activ: activeTab === '2' }, 'tab-nav')}
            onClick={() => {
              toggle('2');
            }}
          >
            Team
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
            Quality Assurance
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ activ: activeTab === '5' }, 'tab-nav')}
            onClick={() => {
              toggle('5');
            }}
          >
            CSR
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col className="mt-5">
              <Row>
                <Col>
                  <h4 className="tab-heading">About us</h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className="tab-body">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Blanditiis ipsam quas molestias unde accusantium! Beatae
                    illum sapiente sequi error inventore!
                  </p>
                  <p className="tab-body">
                    Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
                    consectetur, adipisicing elit. Voluptas deserunt ut delectus
                    est similique perferendis aliquid quis? Quasi, maiores.
                    Sunt. consectetur adipisicing elit. Blanditiis ipsam quas
                    molestias unde accusantium! Beatae illum sapiente sequi
                    error inventore!
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
              <h4 className="tab-heading">Team</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5 style={{ color: 'grey' }}>Management Team</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                aspernatur debitis quia hic exercitationem rerum repellendus
                ducimus dolor perspiciatis quidem?
              </p>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <ProfileCarousel />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <ProfileCarousel />
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <h5 style={{ color: 'grey' }}>Our Doctors</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                aspernatur debitis quia hic exercitationem rerum repellendus
                ducimus dolor perspiciatis quidem?
              </p>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <ProfileCarousel />
            </Col>
          </Row>
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
              <h5> Wellness Program</h5>
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
                Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. Voluptas deserunt ut delectus est
                similique perferendis aliquid quis? Quasi, maiores. Sunt.
                consectetur adipisicing elit. Blanditiis ipsam quas molestias
                unde accusantium! Beatae illum sapiente sequi error inventore!
              </p>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <h5> Laboratory Solutions</h5>
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
                Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
                consectetur, adipisicing elit. Voluptas deserunt ut delectus est
                similique perferendis aliquid quis? Quasi, maiores. Sunt.
                consectetur adipisicing elit. Blanditiis ipsam quas molestias
                unde accusantium! Beatae illum sapiente sequi error inventore!
              </p>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="4">
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
        <TabPane tabId="5">
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
