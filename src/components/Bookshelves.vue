<template>
  <div>
    <div>
      <LocalLink
        v-for="bookshelf in bookshelves"
        :key="bookshelf.id"
        :isActive="bookshelf === activeShelf"
      >
        <router-link :to="{ name: 'reader', params: { shelfSlug: bookshelf.slug }}">
          {{bookshelf.name}}
        </router-link>
      </LocalLink>
    </div>
    <div v-if="activeShelf">
      <h2>{{activeShelf.name}}</h2>
      <div>
        <LocalLink
          v-for="sort in activeShelf.sorts"
          :key="sort.name"
          :isActive="isActiveSort(sort)"
        >
          <router-link
            :to="`/reader/${$route.params.id}/${activeShelf.slug}/${invertedSortSign}${sort.name}`"
          >
            {{sort.title}}
            <span v-if="isActiveSort(sort)">{{sortArrow}}</span>
          </router-link>
        </LocalLink>
      </div>
    </div>
  </div>
</template>

<script>
import styled from 'vue-styled-components';
import { ifProp } from 'styled-tools';

const LocalLink = styled('span', { isActive: Boolean })`
  padding: 1rem;
  & > a {
    color: #2a52be;
    text-decoration: ${ifProp('isActive', 'underline', 'none')};
  }
`;

export default {
  name: 'Bookshelves',
  props: {
    bookshelves: Object,
    activeShelf: Object,
  },
  computed: {
    activeSort() {
      return this.$route.params.sort || (this.activeShelf && this.activeShelf.sorts[0].name);
    },
    invertedSortSign() {
      const currentSign = (this.activeSort.match(/^-/) || '')[0] || '';
      return currentSign === '-' ? '' : '-';
    },
    sortArrow() {
      return this.invertedSortSign === '-' ? '↑' : '↓';
    },
  },
  methods: {
    isActiveSort(sort) {
      return sort.name === this.activeSort.match(/[^-]+/)[0];
    },
  },
  components: {
    LocalLink,
  },
};

</script>
