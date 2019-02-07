<template>
  <Wrapper>
    <h1>User: {{user}}</h1>
    <Bookshelves v-bind="{bookshelves, activeShelf}" />
    <BooksGroups
      v-if="booksGroups.length"
      :booksGroups="booksGroups"
      :onPageBottom="receiveBooksBySlug"
    />
  </Wrapper>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import styled from 'vue-styled-components';

import Bookshelves from '@/components/Bookshelves.vue';
import BooksGroups from '@/components/BooksGroups.vue';

const Wrapper = styled.section`
  max-width: 100rem;
  margin: 0 auto;
`;

export default {
  name: 'reader',
  mounted() {
    const { params } = this.$route;
    this.receiveBookshelves(params.id).then(() => {
      if (params.shelfSlug) {
        this.receiveBooksBySlug();
      } else {
        this.$router.push({
          params: {
            ...params,
            shelfSlug: Object.values(this.bookshelves)[0].slug,
          },
        });
      }
    });
  },
  computed: {
    ...mapState({
      bookshelves: ({ bookshelves }) => bookshelves.list,
      booksGroups: ({ books }) => books.groups,
    }),
    activeShelf() {
      const { params } = this.$route;
      return this.bookshelves[params.shelfSlug];
    },
    user() {
      return this.$route.params.id;
    },
  },
  watch: {
    '$route.params.shelfSlug': function () { this.receiveBooksBySlug(); },
    '$route.params.sort': function () { this.receiveBooksBySlug(); },
  },
  methods: {
    ...mapActions({
      receiveBookshelves: 'bookshelves/receive',
      receiveBooks: 'books/receive',
    }),
    receiveBooksBySlug(page = 1) {
      const { params } = this.$route;
      if (params.shelfSlug) {
        this.receiveBooks({
          userId: this.user,
          bookshelfId: this.bookshelves[params.shelfSlug].id,
          page,
          sort: params.sort,
        });
      }
    },
  },
  components: {
    Wrapper,
    BooksGroups,
    Bookshelves,
  },
};
</script>
