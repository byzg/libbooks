<template>
  <div
    v-infinite-scroll="loadMore"
    infinite-scroll-throttle-delay="500"
  >
    <div v-for="(group, index) of booksGroups">
      <Group>
        <Book v-for="book of group.objects" :book="book" :key="book.id" />
      </Group>
      <Sepapator>{{index + 1}}</Sepapator>
    </div>
  </div>
</template>

<script>
import styled from 'vue-styled-components';

import Book from '@/components/Book.vue';

const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Sepapator = styled.div`
  text-align: center;
  border-bottom: 1px black solid;
`;

export default {
  name: 'BooksGroups',
  props: {
    booksGroups: Array,
    onPageBottom: Function,
  },
  data() {
    return {
      page: 1,
    };
  },
  components: {
    Group,
    Sepapator,
    Book,
  },
  watch: {
    '$route.params.sort': function () { this.page = 1; },
  },
  methods: {
    loadMore() {
      if ([...this.$props.booksGroups].pop().hasNext) {
        this.page++;
        this.$props.onPageBottom(this.page);
      }
    },
  },
};
</script>
