<template>
  <Wrapper>
    <Cover :src="`http://my-lib.ru/${book.work.cover}`" />
    <div>{{book.work.title}}</div>
    <div><b>{{book.work.authorsTitles}}</b></div>
    <div>{{book.work.rating.score}}</div>
  </Wrapper>
</template>

<script>
import styled from 'vue-styled-components';

const Wrapper = styled.div`
  width: 20rem;
  text-align: center;
  padding: 1rem;
`;

const Cover = styled.img`
  width: 13.6rem;
`;

export default {
  name: 'Book',
  props: {
    book: Object,
  },
  components: {
    Wrapper,
    Cover,
  },
};
</script>
