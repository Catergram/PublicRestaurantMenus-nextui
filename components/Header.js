import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Image } from '@nextui-org/react'
import { Col, Row, Text } from "@nextui-org/react"


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header({restaurant}) {
  const { menus, file } = restaurant;
  return (
    <nav style={{ 'position': 'fixed', width: '100%', zIndex: 103}}>
      <Row
        fluid={true}
        css={{pl: '1.5rem', pr: '1.5rem', pt: '0.5rem', pb: '0.3rem', background: '#fff', 'box-shadow': 'rgb(2 1 1 / 10%) 0px 5px 20px -5px;'}}
      >
        <Col direction={'left'}>
          <Image
            width={150}
            height={56}
            src={`https://dgh3t0irkf4qk.cloudfront.net/public/${file[0].key}`}
            containerCss={{
              display: 'inline-block'
            }}
          />
        </Col>
        <Col>
          <Popover.Group as="nav" className="inline-block pull-right">
            <Popover className="relative" style={{marginTop: 15}}>
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'open' : 'close',
                      'full-menu-btn'
                    )}
                  >
                    <Text h4 >FULL MENU</Text>
                    <ChevronDownIcon
                      className={classNames(
                        open ? 'open' : 'close',
                      )}
                      aria-hidden="true"
                      width={30}
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
                    <Popover.Panel>
                      <div className={"full-menu-btn-container"}>
                          {menus.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                            >
                                <Text size={16} weight={'medium'} color="rgb(51, 51, 51)" css={{m: 8}}>{item.name}</Text>
                            </a>
                          ))}
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </Popover.Group>
        </Col>
      </Row>
    </nav>
  )
}
