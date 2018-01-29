var Schema = require('graph.ql')
var to_slug = require('to-slug-case')
var Remarkable = require('remarkable')
var remarkable = new Remarkable()
var assign = require('object-assign')

// a real database would be used in production
var posts = {}

module.exports = Schema(`
  scalar Date
  scalar Markdown

  type Post {
    title: String!
    date: Date!
    body: Markdown!
    slug: String!
    # slug(): String! # could use a computed value
  }

  input PostInput {
    title: String!
    date: Date!
    body: Markdown!
  }

  type Mutation {
    create_post(post: PostInput): Post
  }

  type Query {
    all_posts(): [Post]
    get_post(slug: String): Post
  }
`, {
  Date: {
    serialize (v) {
      //console.log("Date serialize(", "v =", v, ")")
      return new Date(v)
    },
    parse (v) {
      //console.log("Date parse(", "v =", v, ")")
      var date = new Date(v)
      return date.toISOString()
    },
  },
  Markdown: {
    serialize (v) {
      //console.log("Markdown serialize(", "v =", v, ")")
      return v
    },
    parse (v) {
      //console.log("Markdown parse(", "v =", v, ")")
      // turn string into markdown
      return remarkable.render(v)
    },
  },
  Mutation: {
    create_post (mutation, args) {
      //console.log("Mutation create_post(", "mutation =", mutation, ", args =", args, ")")
      var slug = to_slug(args.post.title)
      posts[slug] = assign(args.post, {
        slug: slug
      })
      return posts[slug]
    }
  },
  Query: {
    all_posts (query, args) {
      //console.log("Query all_posts(", "query =", query, ", args =", args, ")")
      // convert keyed object into an array
      return Object.keys(posts).map(function (slug) {
        return posts[slug]
      })
    },
    get_post (query, args) {
      //console.log("Query single_post(", "query =", query, ", args =", args, ")")
      return posts[args.slug]
    }
  }
})

