import { useState, useEffect } from 'react'
import Amplify, { API } from 'aws-amplify';
import { Grid } from "@nextui-org/react";

import config from '../src/aws-exports';

import Cards from '@components/Card';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { getRestaurant } from '../src/graphql/queries'

Amplify.configure(config);

export default function IndexPage() {
  async function fetchPosts() {
    const postData = await API.graphql({
      query: getRestaurant,
      variables: {id: '4c5f8cce-6fed-4c6e-ab89-447781cbcac6'},
    })
    console.log({
      postData
    })
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <>
      <Header />
      <Grid.Container css={{ background: "#fcfcfc" }} justify="center">
        <Grid xs={1} />
        <Grid xs={10}>
          <Cards />
        </Grid>
        <Grid xs={1} />
      </Grid.Container>
      <Footer />
    </>
  )

}
