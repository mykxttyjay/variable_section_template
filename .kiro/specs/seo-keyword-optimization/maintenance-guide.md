# SEO Keyword Maintenance Guide

## Purpose

This guide provides instructions for maintaining unique, effective keywords across all website pages. Follow these guidelines when adding new pages, updating existing content, or optimizing keyword performance.

---

## Core Principles

### 1. Uniqueness

- Every page must have a unique set of keywords
- No two pages should share identical keyword strings
- Overlap should be minimal (<30% between any two pages)

### 2. Relevance

- Keywords must match the page's content and purpose
- Service pages get service-specific keywords
- Location pages get city-specific keywords
- Content pages get informational keywords

### 3. Intent Alignment

- Match keywords to user search intent
- Informational: "what is", "how to", "guide"
- Navigational: brand + location
- Commercial: "best", "top", "professional"
- Transactional: service + location, action-oriented

### 4. Optimal Count

- Target 6-10 keywords per page
- Minimum: 5 keywords
- Maximum: 12 keywords
- Balance between specificity and coverage

---

## Adding New Pages

### Step 1: Identify Page Type

Determine which category your new page falls into:

**Service Page**

- Describes a specific marketing service
- Examples: Email Marketing, Content Marketing, Video Production
- Keyword Pattern: `[service] [location]`, `[service] services`, `[specific terms]`

**Location Page**

- Targets a specific geographic area
- Examples: Westminster, Thornton, Englewood
- Keyword Pattern: `marketing agency [city] CO`, `[city] marketing services`

**Content Page**

- Educational or informational content
- Examples: Blog posts, guides, case studies
- Keyword Pattern: `what is [topic]`, `how to [action]`, `[topic] guide`

**Utility Page**

- Functional pages like About, Contact, Pricing
- Keyword Pattern: `[action] Denver marketing agency`, `[page purpose]`

### Step 2: Research Keywords

1. **Use Google Keyword Planner**

   - Go to: https://ads.google.com/home/tools/keyword-planner/
   - Enter your primary keyword
   - Review search volume and competition
   - Note related keywords

2. **Check Competitor Keywords**

   - Search for similar pages from competitors
   - View their page source (Ctrl+U)
   - Look for `<meta name="keywords"` tag
   - Note effective keywords (don't copy directly)

3. **Analyze Search Intent**

   - Google your primary keyword
   - Look at top 10 results
   - Note what type of content ranks
   - Match your keywords to that intent

4. **Use Related Searches**
   - Scroll to bottom of Google search results
   - Note "Related searches" section
   - These are actual user queries
   - Consider including relevant ones

### Step 3: Select Keywords

Choose 6-10 keywords following this structure:

**Primary Keyword (1)**

- Highest search volume
- Most relevant to page
- Example: "email marketing Denver"

**Secondary Keywords (2-3)**

- Related to primary
- Medium search volume
- Example: "email campaign management", "email marketing services Denver"

**Long-Tail Keywords (3-5)**

- More specific phrases
- Lower competition
- Higher conversion intent
- Example: "automated email marketing Denver", "email newsletter services"

**LSI Keywords (1-2)**

- Semantically related terms
- Support main keywords
- Example: "email automation", "email list management"

### Step 4: Verify Uniqueness

Before finalizing keywords:

1. **Check Keyword Map**

   - Open: `.kiro/specs/seo-keyword-optimization/keyword-map.md`
   - Search for each proposed keyword
   - Ensure no exact matches with existing pages

2. **Run Analysis Script**

   ```bash
   # Add your keywords to the MDX file first
   node scripts/analyze-keywords.mjs
   ```

3. **Check for Overlap**

   - Review the output
   - Look for "Cannibalization Issues"
   - Should show 0 issues

4. **Run Property Tests**
   ```bash
   npx vitest run tests/seo-keywords.test.js
   ```
   - All tests should pass
   - Fix any failures before proceeding

### Step 5: Add to MDX File

Add keywords to your page's metadata section:

```yaml
metadata:
  title: "Your Page Title"
  description: "Your page description"
  keywords: "keyword1, keyword2, keyword3, keyword4, keyword5, keyword6"
  canonical: "https://www.linktothrive.com/your-page-url"
  robots:
    index: true
    follow: true
```

**Format Rules:**

- Comma-separated list
- No quotes around individual keywords
- Quotes around the entire string
- No trailing comma
- Lowercase preferred (except proper nouns)

### Step 6: Update Keyword Map

Add your new page to the keyword map:

1. Open: `.kiro/specs/seo-keyword-optimization/keyword-map.md`
2. Find the appropriate section
3. Add your page following this format:

```markdown
#### Your Page Name

**File:** `path/to/your-page.mdx`  
**Keywords:** keyword1, keyword2, keyword3, keyword4, keyword5, keyword6  
**Intent Types:** Transactional  
**Keyword Count:** 6
```

---

## Updating Existing Keywords

### When to Update

Update keywords when:

- Page is not ranking for target keywords (after 60 days)
- Search volume has changed significantly
- User intent has shifted
- Competitor keywords are performing better
- Page content has been significantly updated

### Step 1: Analyze Current Performance

1. **Check Google Search Console**

   - Go to Performance report
   - Filter by specific page
   - Review:
     - Impressions (how often page appears in search)
     - Clicks (how often users click)
     - Average position (ranking)
     - CTR (click-through rate)

2. **Identify Issues**
   - Low impressions = keywords not being searched
   - Low CTR = title/description not compelling
   - Low position = keywords too competitive
   - No clicks = wrong intent match

### Step 2: Research Better Keywords

1. **Find What's Working**

   - In Search Console, look at "Queries" tab
   - See what keywords are already bringing traffic
   - Consider optimizing for those

2. **Find Opportunities**

   - Look for keywords with:
     - High impressions, low clicks (improve title/description)
     - Position 11-20 (opportunity to reach page 1)
     - Related to your content but not in current keywords

3. **Check Competitors**
   - See what keywords competitors rank for
   - Use tools like SEMrush, Ahrefs, or Moz
   - Find gaps you can fill

### Step 3: Update Keywords

1. **Backup Current Keywords**

   - Copy current keywords to a note
   - Keep for comparison

2. **Replace in MDX File**

   - Open the MDX file
   - Update the `keywords:` field
   - Keep 6-10 keywords
   - Maintain uniqueness

3. **Verify Uniqueness**

   ```bash
   node scripts/analyze-keywords.mjs
   ```

4. **Run Tests**

   ```bash
   npx vitest run tests/seo-keywords.test.js
   ```

5. **Update Keyword Map**
   - Update the entry in keyword-map.md
   - Note the date of change
   - Keep old keywords in a comment for reference

### Step 4: Monitor Results

1. **Wait 30 Days**

   - Search engines need time to re-index
   - Don't make changes too frequently

2. **Track Changes**

   - Monitor position changes in Search Console
   - Track impressions and clicks
   - Note any improvements or declines

3. **Iterate if Needed**
   - If no improvement after 60 days, try different keywords
   - If performance declined, consider reverting
   - Document what works and what doesn't

---

## Monthly Maintenance Checklist

### Week 1: Analysis

- [ ] Run keyword analysis script
- [ ] Check for any new cannibalization issues
- [ ] Review Search Console performance data
- [ ] Identify underperforming pages

### Week 2: Research

- [ ] Research better keywords for underperforming pages
- [ ] Check competitor keyword changes
- [ ] Review search trend changes
- [ ] Identify new keyword opportunities

### Week 3: Updates

- [ ] Update keywords for 2-3 underperforming pages
- [ ] Verify uniqueness with analysis script
- [ ] Run property tests
- [ ] Update keyword map

### Week 4: Monitoring

- [ ] Deploy changes
- [ ] Submit updated pages to Search Console
- [ ] Set reminders to check performance in 30 days
- [ ] Document changes made

---

## Tools and Scripts

### Analysis Script

**Purpose:** Check for keyword cannibalization and uniqueness

**Command:**

```bash
node scripts/analyze-keywords.mjs
```

**Output:**

- Total pages analyzed
- Unique keyword sets
- Cannibalization issues
- Detailed page-by-page breakdown

**When to Run:**

- After adding new pages
- After updating keywords
- Monthly maintenance
- Before deploying changes

### Property Tests

**Purpose:** Validate keyword patterns and formats

**Command:**

```bash
npx vitest run tests/seo-keywords.test.js
```

**Tests:**

- Keyword uniqueness
- Service-specific patterns
- Location-specific patterns
- Informational patterns
- Format validation

**When to Run:**

- After any keyword changes
- Before deploying
- As part of CI/CD pipeline

### Screaming Frog

**Purpose:** Verify keywords are properly rendered on live site

**Process:**

1. Crawl site: https://www.linktothrive.com/
2. Export keywords column
3. Check for duplicates
4. Verify patterns

**When to Run:**

- After deploying keyword changes
- Monthly verification
- When troubleshooting issues

---

## Common Issues and Solutions

### Issue: Keywords Not Showing in Search Console

**Possible Causes:**

- Page not indexed yet
- Keywords not in page content
- Keywords too competitive

**Solutions:**

1. Request indexing in Search Console
2. Add keywords naturally to page content (H1, H2, body text)
3. Choose less competitive long-tail keywords
4. Build backlinks to the page

### Issue: Multiple Pages Ranking for Same Keyword

**Possible Causes:**

- Keyword cannibalization
- Similar content on multiple pages
- Unclear page differentiation

**Solutions:**

1. Run analysis script to identify duplicates
2. Make keywords more specific to each page
3. Add canonical tags if appropriate
4. Consolidate similar pages if needed

### Issue: Page Not Ranking Despite Good Keywords

**Possible Causes:**

- High competition
- Low page authority
- Poor on-page SEO
- Lack of backlinks

**Solutions:**

1. Choose less competitive keywords
2. Improve page content quality
3. Optimize title and meta description
4. Build relevant backlinks
5. Improve internal linking

### Issue: Keywords in MDX Not Appearing on Live Site

**Possible Causes:**

- Build/deployment issue
- Caching
- Incorrect metadata format

**Solutions:**

1. Verify MDX file syntax is correct
2. Rebuild and redeploy site
3. Clear CDN cache
4. Check browser cache (hard refresh)
5. Verify in page source (Ctrl+U)

---

## Best Practices

### Do's ✅

1. **Research Before Choosing**

   - Use keyword tools
   - Check search volume
   - Analyze competition

2. **Match User Intent**

   - Understand what users want
   - Align keywords with content
   - Consider search journey stage

3. **Keep It Natural**

   - Use keywords that sound natural
   - Avoid keyword stuffing
   - Think like your audience

4. **Monitor Performance**

   - Track rankings regularly
   - Analyze traffic patterns
   - Adjust based on data

5. **Document Changes**
   - Update keyword map
   - Note dates of changes
   - Track what works

### Don'ts ❌

1. **Don't Copy Competitors Exactly**

   - Use as inspiration only
   - Create unique combinations
   - Focus on your strengths

2. **Don't Stuff Keywords**

   - Quality over quantity
   - 6-10 keywords is enough
   - More isn't always better

3. **Don't Change Too Often**

   - Wait 30-60 days between changes
   - Give search engines time
   - Track results before changing

4. **Don't Ignore Uniqueness**

   - Always check for duplicates
   - Run analysis script
   - Maintain differentiation

5. **Don't Forget to Test**
   - Run property tests
   - Verify with Screaming Frog
   - Check live site

---

## Keyword Research Resources

### Free Tools

- **Google Keyword Planner** - Search volume and competition
- **Google Search Console** - Actual performance data
- **Google Trends** - Trending keywords and seasonality
- **Answer The Public** - Question-based keywords
- **Ubersuggest** - Keyword suggestions (limited free)

### Paid Tools

- **SEMrush** - Comprehensive keyword research
- **Ahrefs** - Competitor analysis
- **Moz** - Keyword difficulty scores
- **SpyFu** - Competitor keyword tracking

### Manual Research

- **Google Autocomplete** - Type keyword and see suggestions
- **Related Searches** - Bottom of Google search results
- **People Also Ask** - Question boxes in search results
- **Competitor Analysis** - View source of competitor pages

---

## Quick Reference

### File Locations

- **Keyword Map:** `.kiro/specs/seo-keyword-optimization/keyword-map.md`
- **Analysis Script:** `scripts/analyze-keywords.mjs`
- **Property Tests:** `tests/seo-keywords.test.js`
- **Content Files:** `src/content/**/*.mdx`

### Commands

```bash
# Analyze keywords
node scripts/analyze-keywords.mjs

# Run tests
npx vitest run tests/seo-keywords.test.js

# Check specific file
grep "keywords:" src/content/path/to/file.mdx
```

### Keyword Patterns

- **Service:** `[service] [location]`, `[service] services [location]`
- **Location:** `marketing agency [city] CO`, `[city] marketing services`
- **Content:** `what is [topic]`, `how to [action]`, `[topic] guide`
- **Utility:** `[action] [brand]`, `[page purpose] [location]`

---

## Support and Questions

If you need help with keyword optimization:

1. **Review Documentation**

   - This maintenance guide
   - Keyword map document
   - Before/after report

2. **Run Diagnostic Tools**

   - Analysis script
   - Property tests
   - Screaming Frog

3. **Check Examples**
   - Look at existing pages
   - Follow established patterns
   - Use keyword map as reference

---

**Last Updated:** November 26, 2025  
**Next Review:** December 26, 2025  
**Maintained By:** SEO Team
