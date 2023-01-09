const fs = require("fs");
const fetch = require("node-fetch");
const prettier = require("prettier");

const getDate = new Date().toISOString();

const fetchUrl = "https://www.habanerasdelinoapi.com/store/categories/women/";
const YOUR_AWESOME_DOMAIN = "https://habanerasdelino.com";

const formatted = sitemap => prettier.format(sitemap, { parser: "html" });

(async () => {
  const fetchPosts = await fetch(fetchUrl)
    .then(res => res.json())
    .catch(err => console.log(err));

  const postList = [];
  fetchPosts.Categories.forEach(post => postList.push(post.title));

  const postListSitemap = `
    ${postList
      .map(title => {
        return `
          <url>
            <loc>${`${YOUR_AWESOME_DOMAIN}/category-title/enzo-women/${title}`}</loc>
            <lastmod>${getDate}</lastmod>
          </url>`;
      })
      .join("")}
  `;

  const generatedSitemap = `
  `;

  const formattedSitemap = formatted(generatedSitemap);

  fs.writeFileSync("../public/sitemap/sitemap-category-title-women.xml", formattedSitemap, "utf8");
})();
