# Toast

A lightweight popup intended to display a short, non-critical message until a specified duration elapses or the user dismisses it.

[Click a corner/edge for a toast at that location](/demos/toast.html)


## Usage

Use a toast to display notifications and other non-critical messages. Because the user may not see them, do not require that the user interact with them to complete a task.

By default, a `Toast` will remain visible until dismissed. The user can dismiss it by tapping/clicking anywhere outside of it. You can also provide a UI element within the toast contents — a close box, for example — that dismisses the toast.

You can also set a toast's `duration` property to establish a timeout after which the toast will automatically be dismissed.
