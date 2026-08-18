<script lang="ts">
    import { Breadcrumbs } from "pigui";

    const breadcrumbItems = [
        { label: "Home", href: "#" },
        { label: "Components", href: "#" },
        { label: "Breadcrumbs" },
    ];
</script>

<Breadcrumbs items={breadcrumbItems} />

<Breadcrumbs items={breadcrumbItems} separator="›" />
