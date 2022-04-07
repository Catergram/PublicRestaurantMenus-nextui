import React, { useState, useEffect } from 'react';
import { Image } from "@nextui-org/react";
import NextLink from 'next/link';
import dynamic from 'next/dynamic';
import { Row, Col, Spacer, Link, useBodyScroll } from '@nextui-org/react';
import { Container } from '@nextui-org/react';
import { useRouter } from 'next/router';

import { StyledNavContainer, StyledNavMainContainer } from './styles';


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



  const showBlur = !!expanded || !!detached || isHome;

  return (
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
                    width={128}
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
  );
};

export default Navbar;
