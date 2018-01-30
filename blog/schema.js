var Schema = require('graph.ql')
var to_slug = require('to-slug-case')
var Remarkable = require('remarkable')
var remarkable = new Remarkable()
var assign = require('object-assign')

// a real database would be used in production
var posts = {}

module.exports = Schema(`
  # A date. This scalar datatype is not built into GraphQL.
  scalar Date
  # Text stored as Markdown but returned as HTML. This scalar datatype is not built into GraphQL.
  scalar Markdown

  # A blog post.
  type Post {
    # The title of the post.
    title: String!
    # The date of the post.
    # It probably makes sense to have both creation and
    # modification dates, but this is a simple example.
    date: Date!
    # The post body stored as Markdown. This field is returned as HTML.
    body: Markdown!
    # The blog post slug.
    # The slug is created automatically from the title.
    # The slug could be a computed value, but that would incur a
    # performance penalty every time the field is accessed.
    # Additionally, a non-computed slug can be changed if there
    # is a reason for one that does not completely match the title.
    slug: String!
  }

  # The blog post input object.
  input PostInput {
    # The title of the post.
    # The slug is created automatically from the title.
    title: String!
    # The date of the post.
    # It probably makes sense to have both creation and
    # modification dates, but this is a simple example.
    date: Date!
    # The post body stored as Markdown. This field is returned as HTML.
    body: Markdown!
  }

  # These are the mutations available on this server.
  type Mutation {
    # Create a blog post.
    create_post(post: PostInput): Post
  }

  # These are the queries available on this server.
  type Query {
    # Get all blog posts.
    all_posts(): [Post]
    # Get a single blog post by slug.
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

