import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Card, CardContent, CardMedia, Typography, Chip, Grid, Divider, MenuItem, Select, FormControl, InputLabel, Pagination, CardActionArea } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import { setActiveBlogPost, setActivePage } from "../actions/actions";
import { useNavigate } from "react-router";
  

function BlogPage() {
  const dispatch = useDispatch();
  const isMobile = useSelector((state) => state.isMobile);
  const siteColors = useSelector((state) => state.siteColors);
  const siteConfigurations = useSelector((state) => state.siteConfigurations);
  const blogPosts = useSelector((state) => state.blogPosts);
  const onDashboard = useSelector((state) => state.onDashboard);
  const navigate = useNavigate();
  const [activeFilters, setActiveFilters] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const handleChipClick = (category) => {
    setActiveFilters((prevFilters) =>
      prevFilters.includes(category)
        ? prevFilters
        : [...prevFilters, category]
    );
  };

  const handleChipDelete = (category) => {
    setActiveFilters((prevFilters) =>
      prevFilters.filter((filter) => filter !== category)
    );
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const filteredPosts = blogPosts.filter((post) =>
    activeFilters.length > 0 ? activeFilters.includes(post.category) : true
  );

  const sortedBlogPosts = [...filteredPosts].sort((a, b) => {
    const dateA = new Date(a.date); 
    const dateB = new Date(b.date); 
  
    if (sortOrder === "newest") {
      return dateB - dateA; 
    }
    return dateA - dateB; 
  });
  

  const postsPerPage = siteConfigurations.blog_blogPostsPerPage;
  const totalPosts = sortedBlogPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = sortedBlogPosts.slice(startIndex, startIndex + postsPerPage);

  const handleCardClick = (x) => {
    if (siteConfigurations.site_useRoutes) {
        dispatch(setActiveBlogPost(x))
        navigate(`/blog/${x.title.toLowerCase().replace(/\s+/g, '-')}`)
    } else {
        dispatch(setActiveBlogPost(x))
        dispatch(setActivePage('In', false));
        setTimeout(() => {
            dispatch(setActivePage('Name', "SingleBlogPage"));
            dispatch(setActivePage('In', true));
        }, 350);
    }
  }
  return (
    <Box
      sx={{
        minHeight: isMobile ? "calc(100vh - 56px - 4rem)" : "calc(100vh - 64px - 4rem)",
        width: onDashboard ? "calc(100% - 4rem)" : "calc(100vw - 4rem)",
        padding: "2rem",
        backgroundColor: siteColors.pages_blog,
      }}
    >
      {siteConfigurations.blog_blogHeaderImage && (
        <Box
          component="img"
          src={siteConfigurations.blog_blogHeaderImage}
          sx={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
          }}
          alt="Blog Header"
        />
      )}

      {siteConfigurations.blog_blogTitle && (
        <Typography variant="h4" sx={{ marginBottom: "1rem", marginTop: "1rem", color: siteColors.blog_title }}>
          {siteConfigurations.blog_blogTitle}
        </Typography>
      )}

      {siteConfigurations.blog_blogDescription && (
        <Typography variant="subtitle1" sx={{ marginBottom: "1rem", color: siteColors.site_darkFont }}>
          {siteConfigurations.blog_blogDescription}
        </Typography>
      )}

      {(siteConfigurations.blog_useCategoryFilters || siteConfigurations.blog_useSorting) && (
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", justifyContent: 'space-between' }}>
          {siteConfigurations.blog_useCategoryFilters && (
            <Box>
              {siteConfigurations.blog_categories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  clickable
                  onClick={() => handleChipClick(category)}
                  onDelete={
                    activeFilters.includes(category)
                      ? () => handleChipDelete(category)
                      : undefined
                  }
                  deleteIcon={<CancelIcon style={{ color: siteColors.site_lightFont }} />}
                  sx={{
                    margin: "0.5rem",
                    backgroundColor: activeFilters.includes(category) ? siteColors.blog_activeCategoryChipBackground : siteColors.blog_nonActiveCategoryChip,
                    color: activeFilters.includes(category) ? siteColors.site_lightFont : siteColors.site_darkFont,
                  }}
                />
              ))}
            </Box>
          )}
          {siteConfigurations.blog_useSorting && (
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Sort By</InputLabel>
              <Select value={sortOrder} onChange={handleSortChange} size="small">
                <MenuItem value="newest">Newest</MenuItem>
                <MenuItem value="oldest">Oldest</MenuItem>
              </Select>
            </FormControl>
          )}
        </Box>
      )}

      <Grid container spacing={4}>
        {currentPosts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardActionArea onClick={() => {handleCardClick(post)}}>
                    <Box sx={{ position: "relative" }}>
                        <CardMedia
                        component="img"
                        height="180"
                        image={post.headerImage}
                        alt={post.title}
                        />
                        <Chip
                        label={post.category}
                        sx={{
                            position: "absolute",
                            top: "1rem",
                            left: "1rem",
                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                            color: "#fff",
                            fontWeight: "bold",
                        }}
                        />
                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" gutterBottom sx={{color: siteColors.blog_blogPostTitle}}>
                        {post.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        {post.body.split(".")[0]}.
                        </Typography>
                    </CardContent>
                    <Divider sx={{ margin: "1rem 0px" }} />
                    <Box
                        sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0 1rem 1rem",
                        alignItems: "center",
                        marginTop: "auto",
                        }}
                    >
                        <Typography variant="caption" color="text.secondary">
                        {post.date}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                        {post.author}
                        </Typography>
                    </Box>
                </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {totalPosts > siteConfigurations.blog_blogPostsPerPage && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}

export default BlogPage;
