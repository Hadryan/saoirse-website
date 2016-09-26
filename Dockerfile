# Start from a Debian image with the latest version of Go installed
# and a workspace (GOPATH) configured at /go.
FROM golang:latest

# Copy the local package files to the container's workspace.
ADD main.go /go/src/Saoirse/website/main.go

# Build the command inside the container.
# (You may fetch or manage dependencies here,
# either manually or with a tool like "godep".)
RUN go install Saoirse/website

# Run the command by default when the container starts.
ENTRYPOINT /go/bin/website
