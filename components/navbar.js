import React, { Fragment, useState, useEffect } from 'react';
import { Image } from "@nextui-org/react";
import NextLink from 'next/link';
import dynamic from 'next/dynamic';
import { Row, Col, Spacer, Link, useBodyScroll } from '@nextui-org/react';
import { Container } from '@nextui-org/react';
import { useRouter } from 'next/router';

import { StyledNavContainer, StyledNavMainContainer } from './styles';
import Dropdown from 'pages/dropdown';
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import {
  ChartBarIcon,
  CursorClickIcon,
  MenuIcon,
  RefreshIcon,
  ViewGridIcon,
  XIcon,
} from '@heroicons/react/outline'


const Navbar = ({ isHome, hasNotify, routes }) => {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  // const isMobile = useMediaQuery(960);
  const [, setBodyHidden] = useBodyScroll(null, { scrollLayer: true });
  const [scrollPosition, setScrollPosition] = useState(
    (typeof window !== 'undefined' && window.pageYOffset) || 0
  );

  const detached = hasNotify ? scrollPosition > 30 : scrollPosition > 0;

  useEffect(() => {
    window.addEventListener('scroll', onScroll.bind(this));
    return () => {
      window.removeEventListener('scroll', onScroll.bind(this));
    };
  }, []);

  const onScroll = () => {
    requestAnimationFrame(() => {
      setScrollPosition(window.pageYOffset);
    });
  };

  const solutions = [
    {
      name: 'Analytics',
      // description: 'Get a better understanding of where your traffic is coming from.',
      href: '#',
      icon: ChartBarIcon,
    },
    {
      name: 'Engagement',
      // description: 'Speak directly to your customers in a more meaningful way.',
      href: '#',
      icon: CursorClickIcon,
    },
    // { name: 'Security', description: "Your customers' data will be safe and secure.", href: '#', icon: ShieldCheckIcon },
    {
      name: 'Integrations',
      // description: "Connect with third-party tools that you're already using.",
      href: '#',
      icon: ViewGridIcon,
    },
    {
      name: 'Automations',
      // description: 'Build strategic funnels that will drive your customers to convert',
      href: '#',
      icon: RefreshIcon,
    },
  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const showBlur = !!expanded || !!detached || isHome;

  return (
    <>

      <StyledNavMainContainer id="navbar-container">
        <StyledNavContainer style={{ color: '#fff' }} detached={detached} showBlur={showBlur}>
          <Container
            lg={true}
            as="nav"
            display="flex"
            wrap="nowrap"
            alignItems="center"
          >
            <Col
              className="navbar__logo-contain"
              css={{
                '@mdMax': {
                  width: '100%'
                }
              }}
            >
              <Row justify="flex-start" align="center">
                <NextLink href="/">
                  <Link href="/">
                    <Image
                      width={100}
                      height={172}
                      src="images/macd.png" />
                  </Link>
                </NextLink>
                <Spacer x={0.4} />
              </Row>
            </Col>
            <Col
              className="navbar__resources-container"
              css={{ '@mdMax': { d: 'none' } }}
            >
              <Row justify="center" align="center">
                <Spacer x={1} y={0} />
                {/* <NextLink href="/docs/guide/getting-started">
                <Link

                  href="#"
                  css={{
                    color: '$text',
                    '&.active': {
                      fontWeight: '600',
                      color: '$primary'
                    }
                  }}
                >
                  Docs
                </Link>
              </NextLink> */}
                <Spacer x={1} y={0} />
                {/* <NextLink href="/docs/components/avatar">
                <Link
                  aria-disabled

                  title="Components"
                  css={{
                    color: '$text',
                    '&.active': {
                      fontWeight: '600',
                      color: '$primary'
                    }
                  }}
                >
                  Components
                </Link>
              </NextLink> */}
                <Spacer x={1} y={0} />
                {/* <Link
                className="navbar__link"
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/nextui-org/nextui/discussions/new?category=feedback"
                title="Leave your feedback"
                css={{
                  color: '$text'
                }}
              >
                Feedback
              </Link> */}
              </Row>
            </Col>
            <Col className="navbar__search-container">
              <Row
                className="navbar__search-row"
                justify="flex-end"
                align="center"
                css={{
                  position: 'initial',
                  '@mdMax': {
                    jc: 'center'
                  }
                }}
              >
                <Row
                  className="navbar__social-icons-container"
                  justify="flex-end"
                  align="center"
                  gap={1}
                  css={{
                    width: 'initial',
                    '@mdMax': {
                      d: 'none'
                    }
                  }}
                >
                  <Link
                    className="navbar__social-icon"
                    href="https://twitter.com/getnextui"
                    target="_blank"
                    rel="noreferrer"
                    css={{
                      m: '0 6px',
                      '& svg': {
                        transition: '$default'
                      },
                      '&:hover': {
                        '& svg': {
                          opacity: 0.7
                        }
                      }
                    }}
                  >
                    {/* <Twitter size={24} /> */}
                  </Link>
                  <Link
                    className="navbar__social-icon"
                    href="https://discord.gg/9b6yyZKmH4"
                    target="_blank"
                    rel="noreferrer"
                    css={{
                      m: '0 6px',
                      '& svg': {
                        transition: '$default'
                      },
                      '&:hover': {
                        '& svg': {
                          opacity: 0.7
                        }
                      }
                    }}
                  >
                    {/* <Discord size={24} /> */}
                  </Link>
                  <Link
                    className="navbar__social-icon"
                    href="https://github.com/nextui-org/nextui"
                    target="_blank"
                    rel="noreferrer"
                    css={{
                      m: '0 6px',
                      '& svg': {
                        transition: '$default'
                      },
                      '&:hover': {
                        '& svg': {
                          opacity: 0.7
                        }
                      }
                    }}
                  >
                    {/* <Github size={24} /> */}
                  </Link>
                  <Popover className="relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                      <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                        <Popover.Group as="nav" className="hidden md:flex space-x-10">
                          <Popover className="relative">
                            {({ open }) => (
                              <>
                                <Popover.Button
                                  className={classNames(
                                    open ? 'text-gray-900' : 'text-gray-500',
                                    'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                  )}
                                >
                                  <span>Solutions</span>
                                  <ChevronDownIcon
                                    className={classNames(
                                      open ? 'text-gray-600' : 'text-gray-400',
                                      'ml-2 h-5 w-5 group-hover:text-gray-500'
                                    )}
                                    aria-hidden="true"
                                  />
                                </Popover.Button>

                                <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-200"
                                  enterFrom="opacity-0 translate-y-1"
                                  enterTo="opacity-100 translate-y-0"
                                  leave="transition ease-in duration-150"
                                  leaveFrom="opacity-100 translate-y-0"
                                  leaveTo="opacity-0 translate-y-1"
                                >
                                  <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                      <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                        {solutions.map((item) => (
                                          <a
                                            key={item.name}
                                            href={item.href}
                                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                          >
                                            <item.icon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                                            <div className="ml-4">
                                              <p className="text-base font-medium text-gray-900">{item.name}</p>
                                              <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                            </div>
                                          </a>
                                        ))}
                                      </div>

                                    </div>
                                  </Popover.Panel>
                                </Transition>
                              </>
                            )}
                          </Popover>
                        </Popover.Group>
                      </div>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="duration-200 ease-out"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="duration-100 ease-in"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                          <div className="pt-5 pb-6 px-5">
                            <div className="flex items-center justify-between">
                              <div>
                                <img
                                  className="h-8 w-auto"
                                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                  alt="Workflow"
                                />
                              </div>
                              <div className="-mr-2">
                                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                  <span className="sr-only">Close menu</span>
                                  <XIcon className="h-6 w-6" aria-hidden="true" />
                                </Popover.Button>
                              </div>
                            </div>
                            <div className="mt-6">
                              <nav className="grid gap-y-8">
                                {solutions.map((item) => (
                                  <a
                                    key={item.name}
                                    href={item.href}
                                    className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                                  >
                                    <item.icon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                                    <span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
                                  </a>
                                ))}
                              </nav>
                            </div>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </Popover>
                  {/* <ThemeToggle
                  className="navbar__social-icon"
                  css={{
                    m: '0 6px',
                    '& svg': {
                      transition: '$default'
                    },
                    '&:hover': {
                      '& svg': {
                        opacity: 0.7
                      }
                    }
                  }}
                /> */}
                </Row>
                {/* <SearchInput offsetTop={detached ? 0 : 30} /> */}
              </Row>
            </Col>
            <Col
              className="navbar__menu-container"
              css={{
                size: '100%',
                display: 'none',
                '@mdMax': {
                  display: 'flex',
                  justifyContent: 'flex-end'
                }
              }}
            >

            </Col>

          </Container>
        </StyledNavContainer>
      </StyledNavMainContainer>
    </>
  );
};

export default Navbar;
