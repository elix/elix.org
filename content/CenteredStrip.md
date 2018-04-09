# CenteredStrip

A horizontal strip of items. This generally keeps the selected item centered (unless the selected item is at either end of the list).

[`CenteredStripOpacity` is used by `Carousel` for dots or thumbnails](/demos/centeredStripOpacity.html)

[`CenteredStripHighlight` uses a system highlight, much like `ListBox`](/demos/centeredStripHighlight.html)

A [Carousel](Carousel) uses [CenteredStripOpacity](CenteredStripOpacity) as its "proxy list", which contains the dots shown as proxies for the items in the carousel. [CarouselWithThumbnails](CarouselWithThumbnails) also uses the same `CenteredStripOpacity` for the list of thumbnails.
