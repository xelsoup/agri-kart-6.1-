import { Calendar, Clock, MapPin, Package, Truck, TruckIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample shipment data
const shipments = [
  {
    id: "SHP-001",
    orderId: "ORD-001",
    customer: "Juan Dela Cruz",
    destination: "Quezon City, Metro Manila",
    status: "In Transit",
    estimatedDelivery: "2023-05-16",
  },
  {
    id: "SHP-002",
    orderId: "ORD-002",
    customer: "Maria Santos",
    destination: "Makati City, Metro Manila",
    status: "Out for Delivery",
    estimatedDelivery: "2023-05-15",
  },
  {
    id: "SHP-003",
    orderId: "ORD-003",
    customer: "Pedro Reyes",
    destination: "Cebu City, Cebu",
    status: "Processing",
    estimatedDelivery: "2023-05-18",
  },
  {
    id: "SHP-004",
    orderId: "ORD-004",
    customer: "Ana Gonzales",
    destination: "Davao City, Davao",
    status: "Delivered",
    estimatedDelivery: "2023-05-14",
  },
  {
    id: "SHP-005",
    orderId: "ORD-006",
    customer: "Sofia Andres",
    destination: "Iloilo City, Iloilo",
    status: "In Transit",
    estimatedDelivery: "2023-05-17",
  },
]

export default function LogisticsPage() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Processing":
        return <Clock className="mr-2 h-4 w-4" />
      case "In Transit":
        return <Truck className="mr-2 h-4 w-4" />
      case "Out for Delivery":
        return <TruckIcon className="mr-2 h-4 w-4" />
      case "Delivered":
        return <Package className="mr-2 h-4 w-4" />
      default:
        return null
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Processing":
        return "outline"
      case "In Transit":
        return "default"
      case "Out for Delivery":
        return "secondary"
      case "Delivered":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="flex flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 md:px-6">
          <h1 className="text-lg font-semibold md:text-2xl">Logistics</h1>
        </div>
      </header>

      <main className="flex-1 space-y-6 p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">In Transit</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Currently in transit</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Out for Delivery</CardTitle>
              <TruckIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Expected today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Delivered</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">13</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="active">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="active">Active Shipments</TabsTrigger>
              <TabsTrigger value="all">All Shipments</TabsTrigger>
            </TabsList>

            <Button>
              <Truck className="mr-2 h-4 w-4" />
              Create Shipment
            </Button>
          </div>

          <TabsContent value="active" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Shipments</CardTitle>
                <CardDescription>Manage your ongoing shipments and deliveries</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Shipment ID</TableHead>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Est. Delivery</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shipments
                      .filter((shipment) => shipment.status !== "Delivered")
                      .map((shipment) => (
                        <TableRow key={shipment.id}>
                          <TableCell className="font-medium">{shipment.id}</TableCell>
                          <TableCell>{shipment.orderId}</TableCell>
                          <TableCell>{shipment.customer}</TableCell>
                          <TableCell className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                            {shipment.destination}
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusVariant(shipment.status)} className="flex w-fit items-center">
                              {getStatusIcon(shipment.status)}
                              {shipment.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            {new Date(shipment.estimatedDelivery).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Update
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>All Shipments</CardTitle>
                <CardDescription>View all shipments including completed deliveries</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Shipment ID</TableHead>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Est. Delivery</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shipments.map((shipment) => (
                      <TableRow key={shipment.id}>
                        <TableCell className="font-medium">{shipment.id}</TableCell>
                        <TableCell>{shipment.orderId}</TableCell>
                        <TableCell>{shipment.customer}</TableCell>
                        <TableCell className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                          {shipment.destination}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(shipment.status)} className="flex w-fit items-center">
                            {getStatusIcon(shipment.status)}
                            {shipment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          {new Date(shipment.estimatedDelivery).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" disabled={shipment.status === "Delivered"}>
                            {shipment.status === "Delivered" ? "Completed" : "Update"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
