import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { isAddress } from '../../utils/index.js'
import TetuLogo from '../../assets/tetu.png'
import WbtcLogo from '../../assets/wbtc.png'
import DinoLogo from '../../assets/dino.jpg'
import miFARMLogo from '../../assets/ifarm.png'
import iceLogo from '../../assets/ice.png'
import klimaLogo from '../../assets/klima.jpg'
import untLogo from '../../assets/unt.png'
import umaLogo from '../../assets/uma.png'
import clamLogo from '../../assets/clam.png'
import tetuQiLogo from '../../assets/tetuQi.svg'
import dystopialogo from '../../assets/dystopialogo.png'
import DEFAULT_TOKEN_LIST from '../../constants/token_list.json'
import { isTestnet, WMTR_ADDR } from '../../constants/index.js'

const BAD_IMAGES = {}

const Inline = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
`

const Image = styled.img`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  background-color: white;
  border-radius: 50%;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
`

export default function TokenLogo({ address, header = false, size = '24px', ...rest }) {
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(false)
  }, [address])

  if (error || BAD_IMAGES[address]) {
    return (
      <Inline>
        <span {...rest} alt={''} style={{ fontSize: size }} role="img" aria-label="face">
          🤔
        </span>
      </Inline>
    )
  }

  // hard coded fixes for trust wallet api issues
  // if (address?.toLowerCase() === '0xfAC315d105E5A7fe2174B3EB1f95C257A9A5e271') {
  //   address = '0x42456d7084eacf4083f1140d3229471bba2949a8'
  // }

  let path
  if (address?.toLowerCase() === WMTR_ADDR) {
    path = 'https://raw.githubusercontent.com/meterio/token-list/master/data/MTR/logo.png'
  } else {
    const list = DEFAULT_TOKEN_LIST.tokens.filter((x) => (address && x.address.toLowerCase() === address?.toLowerCase()))
    path =
      list.length > 0
        ? list[0].logoURI
        : `https://raw.githubusercontent.com/meterio/token-list/master/generated/token-logos/${isTestnet ? 'metertest' : 'meter'}/${isAddress(
          address
        )}.png`
  }

  return (
    <Inline>
      <Image
        {...rest}
        alt={''}
        src={path}
        size={size}
        onError={(event) => {
          BAD_IMAGES[address] = true
          setError(true)
          event.preventDefault()
        }}
      />
    </Inline>
  )
}
