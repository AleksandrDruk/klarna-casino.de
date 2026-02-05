<?php 

if (!empty($table['brands'])): ?>

<?php 
    $initial_count = 15;
    $brands_with_urls = array_map(function($brand) {
        $brand['logo_url'] = !empty($brand['logo']) ? wp_get_attachment_url($brand['logo']) : '';
        return $brand;
    }, $table['brands']);
    $initial_brands = array_slice($brands_with_urls, 0, $initial_count);
?>

<div class="forge-casino-list">
    <?php $position = 1; foreach ($initial_brands as $brand): ?>
        <?php if (!empty($bonus_filter) && $brand['bonus_type'] !== $bonus_filter) { $position++; continue; } ?>
        <div class="forge-casino-card">
            <div class="forge-rank-badge">#<?= (int)$position ?></div>

            <div class="forge-logo">
                <?php if (!empty($brand['logo_url'])): ?>
                    <?php $logo_bg = !empty($brand['code_bg_color']) ? $brand['code_bg_color'] : '#e8eef8'; ?>
                    <div class="forge-logo-frame" style="background-color: <?= esc_attr($logo_bg) ?>;">
                        <img src="<?= esc_url($brand['logo_url']) ?>" alt="<?= esc_attr($brand['brand_name'] ?? 'brand') ?>">
                    </div>
                <?php endif; ?>
            </div>
            <div class="forge-name-score-wrapper">  
            <div class="forge-name">
                <?= esc_html($brand['brand_name'] ?? '') ?>
                <?php if (!empty($brand['review_link'])): ?>
                    <a href="<?= esc_url($brand['review_link']) ?>" class="forge-review-link">
                        <?= esc_html(($brand['brand_name'] ?? 'Brand') . ' review') ?>
                    </a>
                <?php endif; ?>
            </div>

            <div class="forge-score">
                <?php 
                $score_text = '';
                if (function_exists('btm_calculate_aggregated_rating')) {
                    $agg = btm_calculate_aggregated_rating($brand);
                    if (!empty($agg['rating'])) {
                        $score_text = number_format((float)$agg['rating'], 1);
                    }
                }
                if ($score_text === '' && isset($brand['rating']) && is_numeric($brand['rating'])) {
                    $score_text = number_format((float)$brand['rating'], 1);
                }
                ?>
                <?php if ($score_text !== ''): ?>
                    <div class="forge-score-wrap"><span class="forge-score-label">Notre score</span><span class="forge-score-value"><?= esc_html($score_text) ?></span></div>
                <?php endif; ?>
            </div>
            </div>

            <div class="forge-bonus">
                <?php if (!empty($brand['description'])): ?>
                    <?= esc_html($brand['description']) ?>
                <?php endif; ?>
            </div>

            <div class="forge-action">
                <?php if (!empty($brand['affiliate_link'])): ?>
                    <a class="forge-btn" href="<?= esc_url($brand['affiliate_link']) ?>" target="_blank" rel="nofollow">
                        <?= esc_html($brand['brand_button_text'] ?: 'Play Now') ?>
                    </a>
                <?php endif; ?>
            </div>
        </div>
        <?php $position++; ?>
    <?php endforeach; ?>
</div>

<?php 
$total_brands = count($table['brands']);
if ($total_brands > $initial_count): 
    $load_more_text = !empty($table['load_more_text']) ? $table['load_more_text'] : 'Load More';
?>
    <div class="forge-load-more">
        <button class="forge-load-btn" id="load-more-btn"
                data-offset="<?= esc_attr($initial_count) ?>" 
                data-total="<?= esc_attr($total_brands) ?>"
                data-brands-per-load="10"
                data-load-more-text="<?= esc_attr($load_more_text) ?>">
            <?= esc_html($load_more_text) ?>
        </button>
    </div>
<?php endif; ?>
<?php endif; ?>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const loadBtn = document.getElementById('load-more-btn');
    if (!loadBtn) return;

    const allBrands = <?php echo json_encode($brands_with_urls, JSON_HEX_APOS | JSON_HEX_QUOT); ?>;
    const list = document.querySelector('.forge-casino-list');
    const brandsPerLoad = parseInt(loadBtn.dataset.brandsPerLoad);

    loadBtn.addEventListener('click', function() {
        let offset = parseInt(this.dataset.offset);
        const total = parseInt(this.dataset.total);
        const nextBrands = allBrands.slice(offset, offset + brandsPerLoad);

        if (nextBrands.length === 0) {
            this.remove();
            return;
        }

        let currentPos = offset + 1;
        nextBrands.forEach(brand => {
            const bonusFilter = '<?php echo !empty($bonus_filter) ? $bonus_filter : ''; ?>';
            if (bonusFilter && brand.bonus_type !== bonusFilter) {
                return;
            }

            const div = document.createElement('div');
            div.className = 'forge-casino-card';
            div.innerHTML = `
                <div class="forge-rank-badge">#${currentPos}</div>

                <div class="forge-logo">
                    ${brand.logo_url ? `
                        <div class="forge-logo-frame" style="background-color: ${brand.code_bg_color || '#e8eef8'};">
                            <img src="${brand.logo_url}" alt="${brand.brand_name || 'brand'}">
                        </div>` : ''}
                </div>
                <div class="forge-name-score-wrapper">  
                <div class="forge-name">
                    ${brand.brand_name || ''}
                    ${brand.review_link ? `
                        <a href="${brand.review_link}" class="forge-review-link">
                            ${brand.brand_name ? brand.brand_name + ' review' : 'Brand review'}
                        </a>` : ''}
                </div>

                <div class="forge-score">
                    ${brand.rating ? `
                    <div class="forge-score-wrap"><span class="forge-score-label">Notre score</span><span class="forge-score-value">${parseFloat(brand.rating).toFixed(1)}</span></div>` : ''}
                </div>
                </div>

                <div class="forge-bonus">
                    ${brand.description || ''}
                </div>

                <div class="forge-action">
                    ${brand.affiliate_link ? `
                        <a class="forge-btn" href="${brand.affiliate_link}" target="_blank" rel="nofollow">
                            ${brand.brand_button_text || 'Play Now'}
                        </a>` : ''}
                </div>
            `;
            list.appendChild(div);
            currentPos++;
        });

        offset += nextBrands.length;
        this.dataset.offset = offset;

        if (offset >= total) {
            this.remove();
        }
    });
});
</script>